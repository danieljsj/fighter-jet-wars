
"use strict";

// Update game objects
var update = function (dT) {
	
	for (var i = registry.planes.length - 1; i >= 0; i--) {
		if(registry.planes[i].stats.active){
			registry.planes[i].control();
			registry.planes[i].move();
			registry.planes[i].accelerate();
			registry.planes[i].communicate();
			registry.planes[i].otherPlaneTurnFuncs();
			registry.planes[i].senseEnvironment();

		}
	};

	for (var i=0; i<registry.lasers.length; i++){

		registry.lasers[i].move(dT);
		registry.lasers[i].senseEnvironment();
	
	}

};