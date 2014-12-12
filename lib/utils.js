hasUpVoted = function(voterId, photoId) {
  var query = {'_id':photoId, 'upVotes': { $in: [ voterId ] } };
  var voteCheck = Images.findOne(query);
  return (voteCheck !== undefined);
};

hasDownVoted = function(voterId, photoId) {
  var query = {'_id':photoId, 'downVotes': { $in: [ voterId ] } };
  var voteCheck = Images.findOne(query);
  return (voteCheck !== undefined);
};

setTopVote = function() {
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
