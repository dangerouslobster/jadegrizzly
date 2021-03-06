/**
 * Photo View Helpers
 */

Template.contestPhotos.helpers({
  photos: function() {
    if (Session.get('profileViewUser')) {
      var cursor = Images.find({userId: Session.get('profileViewUser')}).fetch();
    } else {
      var cursor = Images.find({featName: Session.get('currentFeatName')}, {sort: {voteCount: -1}}).fetch();
    }
    var ads = Adverts.find({}).fetch();
    var result = [];
    for(var i=0;i<cursor.length;i++){
      result.push(cursor[i]);
      if(i%3 === 0){
        result.push(ads[Math.floor(Math.random() * ads.length)])
      };

    };
    return result;
  },

  gameName: function() {
    return Games.findOne(Session.get('currentGameId'));
  },
  featName: function() {
    return Session.get('currentFeatName');
  }
});

Template.contestPhotos.events({
  'click .navigate-events': function(evt, template) {
    Router.go('/game');
  },

  'click .navigate-photos': function(evt, template){
    Router.go('/topPhotos');
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

Template.snapshots.helpers({
  isOwner: function() {
    return Meteor.userId() === this.userId;
  }
});

Template.snapshots.events({
  'click div.upvote': function(evt, template) {
    var userId = Meteor.userId();

    var upVoteCheck = hasUpVoted( userId, this._id);
    var downVoteCheck = hasDownVoted(userId, this._id);
    if (downVoteCheck) {
      Meteor.call('imagesUpsert', this._id, {$inc: {'voteCount': 1}});
      Meteor.call('imagesUpsert', this._id, {$pull: {'downVotes': userId}}, function() {
        setTopVote();
      });
      console.log('removed downvote');
    } else if (!upVoteCheck) {
      console.log('upVoted');
      Meteor.call('imagesUpsert', this._id, {$inc: {'voteCount': 1}});
      Meteor.call('imagesUpsert', this._id, {$push: {'upVotes': userId}}, function() {
        setTopVote();
      });
    }
    else {
      console.log('prevented upvote');
    }
  },

  'click div.downvote': function(evt, template) {
    var userId = Meteor.userId();

    var upVoteCheck = hasUpVoted(userId, this._id);
    var downVoteCheck = hasDownVoted(userId, this._id);
    if (upVoteCheck) {
      Meteor.call('imagesUpsert', this._id, {$inc: {'voteCount': -1}});
      Meteor.call('imagesUpsert', this._id, {$pull: {'upVotes': userId}}, function() {
        setTopVote();
      });
      console.log('removed downvote');
    } else if (!downVoteCheck) {
      console.log('downvoted');
      Meteor.call('imagesUpsert', this._id, {$inc: {'voteCount': -1}});
      Meteor.call('imagesUpsert', this._id, {$push: {'downVotes': userId}}, function() {
        setTopVote();
      });
    } else {
      console.log('prevented upvote');
    }
  },

  'submit form.new-comment': function(evt, template){
    evt.preventDefault();

    var input = template.find('.addComment');

    var comment = input.value;

    Meteor.call('imagesUpsert', this._id, {$push: {'comments': {'comment': comment, 'username': Meteor.user().username}}});

    input.value = '';
  },

  'submit form.new-title': function(evt, template){
    evt.preventDefault();
    var input = template.find('.addTitle');

    var title = input.value;

    Meteor.call('imagesUpsert', this._id, {$set: {'title': title}});

    input.value = '';
  },

  'click .username': function(evt, template) {
    var userId = Meteor.users.findOne({username: this.username})._id;
    Session.set('profileViewUser', userId);
  }
});
