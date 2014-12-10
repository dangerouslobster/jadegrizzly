/**
 * Photo View Helpers
 */

Template.contestPhotos.helpers({
  photos: function() {
    var cursor =  Images.find({featName: Session.get('currentFeatName')});
    // var cursor =  Images.find({gameId: Session.get('currentGameId')});//gameId: Session.get('currentGameId')
    return cursor;
  },
  gameName: function() {
    return Games.findOne(Session.get('currentGameId'));
  }
});

Template.contestPhotos.events({
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

