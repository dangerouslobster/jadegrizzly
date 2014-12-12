/**
 * Create Game Helpers
 */

Template.messages.helpers({
  messages: function() {
    return Messages.find().fetch();
  }
});

Template.messages.events({
  'submit form.new-message': function(evt, template) {
    evt.preventDefault();
    var value = template.find('.addMessage').value;
    Meteor.call('messagesInsert', {'message': value, 'user': Meteor.user().username});
    template.find('.addMessage').value = '';
  }

});
