'use strict';
// calculating offset for sent commands. and maybe also for ticks...

const FirebaseRefS = require('./FirebaseRefS');

let _offset;
let _offsetRef;

FirebaseRefS.initThen(function(){ // todo: maybe figure out smarter ways of init'ing everything in a cool async waterfall or whatever.
  _offsetRef = FirebaseRefS.ref.child(".info/serverTimeOffset");
  _updateOffset();
  setInterval(_updateOffset, 1000);
});

function _updateOffset(){
	_offsetRef.on("value", function(ss) {
    	_offset = ss.val();
	});
}


function getOffset(){
	return _offset;
}

module.exports = {
	getOffset: getOffset,
}