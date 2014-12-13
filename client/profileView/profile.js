/**
 *  Helpers for Player Profile
 */

Template.profile.helpers({
  user: function() {
    var userId = Session.get('profileViewUser');
    return Meteor.users.findOne({_id: userId});
  },
  gameList: function() {
    var userId = Session.get('profileViewUser');
    return Games.find({"createdBy": userId}).fetch();
  },
  currentUserProfile: function() {
    return Meteor.userId() === Session.get('profileViewUser');
  },
  friendGameList: function() {
    var cursor = Meteor.users.find({'_id': Meteor.userId()});
    return Games.find({'_id': {$in :cursor.fetch()[0].friendGameList}});
  }
});

Template.profile.events({
  'click a.poke': function(evt, template){
    evt.preventDefault();
    Meteor.call('poke', Session.get('profileViewUser'));
  },
});

/**
 * Helpers for Each Game
 */

Template.profileGames.helpers({
  hasGames: function() {
  }

});

Template.profileGames.events({
  'click a.profile-game-name': function(evt, template) {
    evt.preventDefault();
    var gameId = (Games.findOne({gameName: this.gameName}));

    Session.set('currentGameId', gameId._id);
    Router.go('/game');
  }
});
