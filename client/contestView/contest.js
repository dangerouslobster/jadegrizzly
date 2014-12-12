/**
 * Photo View Helpers
 */

Template.contestPhotos.helpers({
  photos: function() {
    var cursor =  Images.find({featName: Session.get('currentFeatName')}, {sort: {voteCount: -1}});
    return cursor;
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

var hasUpVoted = function(voterId, photoId) {
  var query = {'_id':photoId, 'upVotes': { $in: [ voterId ] } };
  var voteCheck = Images.findOne(query);
  return (voteCheck !== undefined);
};

var hasDownVoted = function(voterId, photoId) {
  var query = {'_id':photoId, 'downVotes': { $in: [ voterId ] } };
  var voteCheck = Images.findOne(query);
  return (voteCheck !== undefined);
};

var setTopVote = function() {
  var cursor1 =  Images.find({featName: Session.get('currentFeatName')});
  var cursorArr = cursor1.fetch();
  console.log(cursorArr);
  var max = Number.NEGATIVE_INFINITY;
  var maxId;
  for (var i = 0; i < cursorArr.length; i++) {
    if (cursorArr[i].voteCount > max) {
      max = cursorArr[i].voteCount;
      maxId = cursorArr[i]._id;
    }
  }

  cursor1.forEach(function(doc, index, cursor) {
    if (doc._id === maxId) {
      Images.update({_id: doc._id},{$set:{'topVoted': true}});
    } else {
      Images.update({_id: doc._id},{$set:{'topVoted': false}});
    }
  });
};

/**
 * Helpers for each Photo
 */

Template.snapshots.events({
  'click div.upvote': function(evt, template) {
    var userId = Meteor.userId();
    // console.log(this);
    var upVoteCheck = hasUpVoted(userId, this._id);
    var downVoteCheck = hasDownVoted(userId, this._id);
    Session.set('currentFeatName', this.featName)
    // console.log(this.featName);
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
    Session.set('currentFeatName', this.featName)
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
  }
});


