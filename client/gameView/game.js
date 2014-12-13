/**
 * Game helper & events
 */

Template.game.helpers({
  newGame: function() {
    return Games.findOne(Session.get('currentGameId'));
  },
  events: function() {
    var q = Games.findOne(Session.get('currentGameId'));
    return q.featList;
  },
  currentUserIs: function(userId) {
    return userId === Meteor.userId();
  }
});

Template.game.events({
  'click .navigate-photos': function(evt, template){
    Router.go('/topPhotos');
  },
  'click .navigate-events': function(evt, template){
    Router.go('/game');
  },
  'click .go-back': function(evt, template){
    Router.go('/create');
  },
  'click .delete': function(evt) {
    Meteor.call("deleteGame", Session.get('currentGameId'));
    Router.go('/games');
  },
  'click .endgame': function(evt) {
    Meteor.call('gamesUpsert', Session.get('currentGameId'), {$set:{closed: true}});
  },
  'submit form.new-event': function(evt, template) {
    evt.preventDefault();

    var input = template.find('.addEvents');
    var featName = input.value.trim();
    var featNameCheck = Games.findOne({_id:Session.get('currentGameId'), "featList.name":featName});
    if (!featNameCheck) {
      Meteor.call('gamesUpsert', Session.get('currentGameId'), {$push:{featList: {name: featName}}});
      console.log('game event created');
    } else {
      // TODO add relevant message that feat already exists
      console.log('game event already exists');
    }

    input.value = '';
  },
  'click .contest-photos': function(evt, template) {
    var value = evt.currentTarget.innerText;
    Session.set('profileViewUser', null);
    Session.set('currentFeatName', value);
    Router.go('/contestPhotos');
  },

  'click .logout': function(evt, template){
    console.log('Logging user out...');
    Meteor.logout(function(err) {
      Router.go('/');
    });
  }
});

/**
 * List item events.
 */

// Created on game render.
Template.gameEvent.created = function() {
  this.glyphIcon = new ReactiveVar;
  this.glyphIcon.set('glyphicon-pushpin');
};

Template.gameEvent.helpers({
  checker: function() {
    return Template.instance().glyphIcon.get();
  }
});

Template.gameEvent.events({
  'click a.event-name': function (evt, template) {
    var cameraOptions = {
      width: 800,
      height: 600
    };

    var featName = this.name;
    var glyphIcon = template.glyphIcon.get();

    MeteorCamera.getPicture(cameraOptions, function (error, data) {
      if(error) {
        console.log(error);
      } else {
        // INSERT URL TO DB
        Session.set('eventImage', data);
        var gameId = Session.get('currentGameId');
        var userId = Meteor.userId();

        // TODO Check if the user already has a photo for this featName, gameId and playerId
        // The unique key is featName, gameId + playerId

        Images.insert({
                        userId: userId,
                        username: Meteor.user().username,
                        gameId: gameId,
                        featName: featName,
                        "photoURL":data, // I don't know why photoURL is in quotes. I don't even know why it's called photoURL
                        voteCount: 0,
                        downVotes: [],
                        upVotes: [],
                        topVoted: false
                      });

        template.glyphIcon.set('glyphicon-ok');
      }
    });
  }


});
