/**
 * Create Game Helpers
 */

Template.friends.helpers({
  friends: function() {
    var friendsArr = Meteor.user().friends;
    // console.log('friendsArr: ', friendsArr);
    if (friendsArr) {
      return Meteor.users.find({_id: {$in: friendsArr}}).fetch();
    }
  },
  requests: function() {
    var requestsArr = Meteor.user().requests;
    // console.log('requestsArr: ', requestsArr);
    if (requestsArr) {
      return Meteor.users.find({_id: {$in: requestsArr}}).fetch();
    }
  },
  users: function () {
    var friendsArr = Meteor.user().friends;
    var requestsArr = Meteor.user().requests;
    var usersArr = friendsArr.concat(requestsArr);
    usersArr.push(Meteor.userId());
    // console.log('usersArr: ', usersArr);
    if (usersArr) {
      return Meteor.users.find({_id: {$nin: usersArr}}).fetch();
    }
  }
});

Template.friends.events({
  'click .username': function(evt, template) {
    Session.set('profileViewUser', this._id);
  }
});

Template.request.events({
  'click .remove': function(evt, template) {
    Meteor.call('usersUpsert', Meteor.userId(), {$pull: {requests: this._id}});
  },
  'click .add': function(evt, template) {
    Meteor.call('usersUpsert', this._id, {$push: {friends: Meteor.userId()}});
    Meteor.call('usersUpsert', Meteor.userId(), {$push: {friends: this._id}});
    Meteor.call('usersUpsert', Meteor.userId(), {$pull: {requests: this._id}});
  }
});

Template.user.events({
  'click .request': function(evt, template) {
    evt.preventDefault();

    var user = Meteor.user();
    var userId = Meteor.userId();
    console.log(this);

    var friend = Meteor.users.findOne({_id: this._id});

    if (!friend) {
      alert(this.username + ' does not exist');
    } else if (userId === friend._id) {
      alert('you cannot be friends with yourself');
    } else if (user.friends.indexOf(friend._id) !== -1) {
      alert(this.username + ' is already a friend');
    } else {
      Meteor.call('usersUpsert', friend._id, {$push: {requests: userId}});
      alert('friend request sent');
    }
  }
});
