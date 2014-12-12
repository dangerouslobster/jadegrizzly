/**
 * Setup Client Collections
 */

Players = new Meteor.Collection('players');
Games = new Meteor.Collection('games');
Feats = new Meteor.Collection('feats');
Images = new Meteor.Collection('images');
Messages = new Meteor.Collection('messages');

Meteor.subscribe('players');
Meteor.subscribe('users');
Meteor.subscribe('games');
