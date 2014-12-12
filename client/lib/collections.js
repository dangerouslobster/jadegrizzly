/**
 * Setup Client Collections
 */

Players = new Meteor.Collection('players');
Games = new Meteor.Collection('games');
Feats = new Meteor.Collection('feats');
Images = new Meteor.Collection('images');
Messages = new Meteor.Collection('messages');
Adverts = new Meteor.Collection('adverts');

Meteor.subscribe('players');
Meteor.subscribe('users');
Meteor.subscribe('games');
Meteor.subscribe('adverts');
Meteor.subscribe('messages');
Meteor.subscribe('feats');


// Insert some ads.
Meteor.call('advertsUpsert', 'Red Lobster', {
  vendor: 'Red Lobster',
  photoURL: 'http://www.findthatlogo.com/wp-content/gallery/red-lobster-logo-gallery/red-lobster-official-logo.jpg',
  title: 'Red Lobster - Fresh Fish, Live Lobster',
  href: 'http://redlobster.com'
});

Meteor.call('advertsUpsert', 'Hack Reactor', {
  vendor: 'Hack Reactor',
  photoURL: 'https://datafox-data.s3.amazonaws.com/images/cb_4283eccb5038fb47b236987b9424c5d4.png',
  title: 'Hack Reactor - BA for Barista',
  href: 'http://hackreactor.com'
});

Meteor.call('advertsUpsert', 'Starbucks', {
  vendor: 'Starbucks',
  photoURL: 'http://1.bp.blogspot.com/_k9mUv3KvFh0/Rzp5I0XVMRI/AAAAAAAAAFk/ogxDlGjJENU/s1600/Starbucks-logo.gif',
  title: 'Starbucks - Inspire the Human Spirit',
  href: 'http://starbucks.com'
});

Meteor.call('advertsUpsert', 'Heinz', {
  vendor: 'Heinz',
  photoURL: 'http://www.heinz.com/media/downloads/view/HeinzLogo.jpg',
  title: 'Heinz - 57 Varieties',
  href: 'http://heinz.com'
});

Meteor.call('advertsUpsert', 'Cleaver.io', {
  vendor: 'Cleaver.io',
  photoURL: 'http://i.giphy.com/TlK63EuGI2K0craxhza.gif',
  title: 'Cleaver.io - Cut the Crepe',
  href: 'http://cleaver.io'
})
