
"use strict";

// Update game objects
var update = function (dT) {

	for (var i=0; i<registries.lasers.length; i++){

		registries.lasers[i].move(dT);
		registries.lasers[i].sense();
	
	}

	// PLANES:
	for (var i = registries.planes.length - 1; i >= 0; i--) {

		// if active
		if( ! registries.planes[i].stats.dead ){

			registries.planes[i].control();
			registries.planes[i].move(dT);
			registries.planes[i].accelerate(dT);
			registries.planes[i].communicate();
			registries.planes[i].sense();

		}
		// always
		registries.planes[i].refresh(dT);

	};




};