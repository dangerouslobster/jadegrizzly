/**
 * Create Game Helpers
 */

Template.friends.helpers({
  friends: function() {
    var friendsArr = Meteor.user().friends;
    if (friendsArr) {
      return Meteor.users.find({_id: {$in: friendsArr}}).fetch();
    }
  },
  requests: function() {
    var requestsArr = Meteor.user().requests;
    if (requestsArr) {
      return Meteor.users.find({_id: {$in: requestsArr}}).fetch();
    }
  }
});

Template.friends.events({
  'submit form.new-friend': function(evt, template) {
    evt.preventDefault();

    var user = Meteor.user();
    var userId = Meteor.userId();

    var input = template.find('.friendName');
    var friendUsername = input.value;

    var friend = Meteor.users.findOne({username: friendUsername});

    // check if invite was already sent

    if (!friend) {
      console.log(friendUsername + ' does not exist');
    } else if (userId === friend._id) {
      console.log('you cannot be friends with yourself');
    } else if (user.friends.indexOf(friend._id) !== -1) {
      console.log(friendUsername + ' is already a friend');
    } else {
      Meteor.call('usersUpsert', friend._id, {$push: {requests: userId}});
      console.log('friend request sent');
    }
    input.value = '';
  }
});

Template.request.events({
  'click .remove': function(evt, template) {
    Meteor.call('usersUpsert', Meteor.userId(), {$pull: {requests: this._id}});
  },
  'click .add': function(evt, template) {
    console.log('Meteor.userId(): ', Meteor.userId());
    console.log('this._id: ', this._id);
    Meteor.call('usersUpsert', this._id, {$push: {friends: Meteor.userId()}});
    Meteor.call('usersUpsert', Meteor.userId(), {$push: {friends: this._id}});
    Meteor.call('usersUpsert', Meteor.userId(), {$pull: {requests: this._id}});
  }
})
