'use strict';
// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	var dT = delta / 1000;
	update(dT);
	render(dT);

	then = now;
	
	requestAnimationFrame(main);
};