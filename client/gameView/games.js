/*
 * Games View Helpers
 */

Template.allGames.helpers({
  gameList: function() {
    var gameQuery = Session.get('game-query') || '';
    return Games.find({
      gameName: { $regex: gameQuery, $options: 'i'}
    });
  }
});

Template.oneGame.helpers({
  gameOwner: function() {
    var owner = Meteor.users.findOne(this.createdBy);
    return owner.username;
  }
})

Template.allGames.events({
  'keyup input.gameQuery': function (evt) {
    Session.set("game-query", evt.currentTarget.value);
  }
});

Template.oneGame.events({
  'click .profile-game-name': function (evt) {
    evt.preventDefault();
    Session.set('currentGameId', this._id);
    Router.go('/game');
  }
})
