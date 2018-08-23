'use strict';;

// Update game objects
var update = function (dT) {

	for (var i=0; i<registries.lasers.length; i++){

		if (registries.lasers[i]) {
			registries.lasers[i].move(dT);
		} else {
			console.warn("laser #",i," is undefined/falsy at move()");
		}
		if (registries.lasers[i]) {
			registries.lasers[i].sense();
		} else {
			console.warn("laser #",i," is undefined/falsy at sense()");
		}
	
	}

	// PLANES:
	for (var i = registries.planes.length - 1; i >= 0; i--) {

		// if active
		if( ! registries.planes[i].stats.dead ){

			registries.planes[i].control();
			registries.planes[i].move(dT);
			registries.planes[i].accelerate(dT);
			registries.planes[i].communicate();
			// registries.planes[i].sense(); // just let lasers do the sensing for now. this will mean no crashes.

		}
		// always
		registries.planes[i].refresh(dT);

	};




};