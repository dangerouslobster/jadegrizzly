/**
 *  Helpers for Player Profile
 */

Template.profile.helpers({
  user: function() {
    var userId = Session.get('profileViewUser');
    return Meteor.users.findOne({_id: userId});
    // return Meteor.user();
  },
  gameList: function() {
    var userId = Session.get('profileViewUser');
    return Games.find({"createdBy": userId});
  }
});

/**
 * Helpers for Each Game
 */

Template.profileGames.helpers({
  stringNotEmpty: function(string) {
    return string !== undefined ? true : false;
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
