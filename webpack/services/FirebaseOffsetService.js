// calculating offset for sent commands. and maybe also for 

sdlkafdkj sdlkfjsd lk trololo this file is not in use.

let _offset;
FirebaseRefService.initThen(function(){ // todo: maybe figure out smarter ways of init'ing everything in a cool async waterfall or whatever.
  commandsRef = FirebaseRefService.ref.child('commands');
  
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