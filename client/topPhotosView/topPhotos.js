/**
 * Photo View Helpers
 */

Template.topPhotos.helpers({
  photos: function() {
    var cursor =  Images.find({topVoted:true}, {sort: {voteCount: -1}});
    return cursor;
  },
  gameName: function() {
    return Games.findOne(Session.get('currentGameId'));
  }
});

Template.topPhotos.events({
  'click .navigate-events': function(evt, template) {
    Router.go('/game');
  },

  'click .go-back': function(evt, template) {
    Router.go('/game');
  },

  'click .logout': function(evt, template) {
    console.log('Logging user out...');
    Meteor.logout(function(err) {
      Router.go('/');
    });
  }
});
