Template.leaders.helpers({
  users: function () {
    var users =  Meteor.users.find({}).fetch();
    console.log(JSON.stringify(users))
    users.sort(function(a, b){
      console.log(b.pokes, a.pokes)
      return b.pokes - a.pokes;
    });
    return users;
  }
});
