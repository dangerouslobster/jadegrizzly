/**
 * Setup Client Collections
 */

Players = new Meteor.Collection('players');
Games = new Meteor.Collection('games');
Feats = new Meteor.Collection('feats');
Images = new Meteor.Collection('images');

Meteor.subscribe('players');
Meteor.subscribe('users');
Meteor.subscribe('games');
