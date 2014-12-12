/**
 * Create Game Helpers
 */

Template.messages.helpers({
  messages: function() {
    return Messages.find({}).fetch().reverse();
  }
});

Template.messages.events({
  'submit form.new-message': function(evt, template) {
    evt.preventDefault();
    var value = template.find('.addMessage').value;
    Meteor.call('messagesInsert', {'message': value, 'username': Meteor.user().username});
    template.find('.addMessage').value = '';
  },

  'click .username': function(evt, template) {
    var userId = Meteor.users.findOne({username: this.username})._id;
    Session.set('profileViewUser', userId);
  }

});
