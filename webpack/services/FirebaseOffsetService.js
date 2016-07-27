'use strict';
// calculating offset for sent commands. and maybe also for ticks...

const FirebaseRefService = require('./FirebaseRefService');

let _offset;

FirebaseRefService.initThen(function(){ // todo: maybe figure out smarter ways of init'ing everything in a cool async waterfall or whatever.
  var offsetRef = FirebaseRefService.ref.child(".info/serverTimeOffset");
  offsetRef.on("value", function(ss) {
    _offset = ss.val();
  });
});

function getOffset(){
	return _offset;
}

module.exports = {
	getOffset: getOffset,
}