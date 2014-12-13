Template.leaders.helpers({
  users: function () {
    return Meteor.users.find({}).fetch().sort(function(a, b){
      return b.pokes - a.pokes;
    })
  }
});
