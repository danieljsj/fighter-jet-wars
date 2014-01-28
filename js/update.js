
"use strict";

// Update game objects
var update = function (dT) {
	
	player1	.control	(); //MAKE THIS!
	
	player1	.move		(dT);
	player2	.move		(dT);
//	comp1	.move		(dT);

	player1	.accelerate	(dT);
	player2	.accelerate	(dT);
//	comp1	.accelerate	(dT);

	player1 .communicate();
	player2 .communicate();

	player1 .otherPlaneTurnFuncs(dT);
	player2 .otherPlaneTurnFuncs(dT);
//	console.log(dT);
//	laser	.move		(dT); 


//	senseEnvironment(laser); /// WHAT DO WE ACTUALLY HAVE HERE
	
	// Sensing for Buildings;
	// currently only in static square
	 
/*	if (senseBuilding(hero.x,hero.y) === true) {
		alert('you suck');
	}
*/	

	for (var i=0; i<registry.lasers.length; i++){

		registry.lasers[i].move(dT);
	
	}

};