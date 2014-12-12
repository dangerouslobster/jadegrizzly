
/**
 * Create Collections
 */
Players = new Meteor.Collection('players');
Games = new Meteor.Collection('games');
Images = new Meteor.Collection('images');
Messages = new Meteor.Collection('messages');
Adverts = new Meteor.Collection('adverts');

/**
 * Authenticate Client For DB Access
 */
Images.allow({
  insert: function (userId, doc) {
    // can only create docs where you are the author
    return true;
  },
  remove: function (userId, doc) {
    // can only delete your own docs
    return true;
  },
  update: function(userId, doc) {
    return true;
  }
});


Players.allow({
  insert: function (userId, doc) {
    // can only create docs where you are the author
    return true;
  },
  remove: function (userId, doc) {
    // can only delete your own docs
    return true;
  },
  update: function(userId, doc) {
    return true;
  }
});

Games.allow({
  insert: function (userId, doc) {
    // can only create docs where you are the author
    return true;
  },
  remove: function (userId, doc) {
    // can only delete your own docs
    return true;
  },
  update: function(userId, doc) {
    return true;
  }
});

Messages.allow({
  insert: function (userId, doc) {
    // can only create docs where you are the author
    return true;
  },
  remove: function (userId, doc) {
    // can only delete your own docs
    return true;
  },
  update: function(userId, doc) {
    return true;
  }
});

Adverts.allow({
  insert: function (userId, doc) {
    // can only create docs where you are the author
    return true;
  },
  remove: function (userId, doc) {
    // can only delete your own docs
    return true;
  },
  update: function(userId, doc) {
    return true;
  }
});


/**
 * Publish To Client
 */

Meteor.publish('players', function() {
  return Players.find();
});

Meteor.publish('users', function() {
  return Meteor.users.find();
});

Meteor.publish('games', function() {
  return Games.find();
});

Meteor.publish('images', function() {
  return Images.find({});
});

Meteor.publish('messages', function() {
  return Messages.find({});
});

Meteor.publish('adverts', function() {
  return Adverts.find({});
});



/**
 * Server Methods
 */

Meteor.methods({
  playersUpsert: function(id, doc) {
    Players.upsert(id, doc);
  },

  deleteGame: function(gameId) {
    Games.remove(gameId);
  },

  gamesUpsert: function(id, doc) {
    Games.upsert(id, doc);
  },

  featListUpdate: function(id, doc) {
    Games.update(id, doc);
  },

  imagesUpsert: function(id, doc) {
    Images.upsert(id, doc);
  },

  messagesInsert: function(doc) {
    Messages.insert(doc);
  },

  usersUpsert: function(id, doc) {
    Meteor.users.upsert(id,doc);
  },

  advertsUpsert: function(id, doc) {
    var result = Adverts.upsert({vendor: id},doc);
    console.log(id, result )

  }
});


Accounts.onCreateUser(function(options, user) {
  user.friends = [];
  user.requests = [];
  if (options.profile) {
    user.profile = options.profile;
  }
  return user;
});
