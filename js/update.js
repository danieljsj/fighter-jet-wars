
"use strict";

// Update game objects
var update = function (dT) {
	
	player1	.control	(); //MAKE THIS!
	
	player1	.move		(dT);
	player2	.move		(dT);
	comp1	.move		(dT);

	player1	.accelerate	(dT);
	player2	.accelerate	(dT);
	comp1	.accelerate	(dT);

//	console.log(dT);
	render();
//	laser	.move		(dT); 


//	senseEnvironment(laser); /// WHAT DO WE ACTUALLY HAVE HERE
	
	// Sensing for Buildings;
	// currently only in static square
	 
/*	if (senseBuilding(hero.x,hero.y) === true) {
		alert('you suck');
	}
*/	


};


 
 function senseBuilding(x,y){
		// Am I touching a building?
		if (
			   x <= (bldg1.x + bldg1.width/2) //Am I left of right of bldg body?
			&& x >= (bldg1.x - bldg1.width/2) //Am I right of left of bldg body?
			&& y <= (bldg1.y + bldg1.height/2) //Am I below top of bldg body?
			&& y >= (bldg1.y - bldg1.height/2) //Am I above bottom of bldg body?
		) { 
			return true;
		} else 	{ 
			return false;
		}
 }
 
 
function senseEnvironment(ob){
	
	if (true == ob.active) {

		// Am I touching the outer border?
		if (ob.x > canvas.width || ob.x < 0 || ob.y > canvas.height || ob.y < 0 ) {
			ob.active = false;
		}

		// Am I touching a monster?
		if (
			ob.x <= (monster.x + 16)
			&& monster.x <= (ob.x + 16)
			&& ob.y <= (monster.y + 16)
			&& monster.y <= (ob.y + 16)
		) {
			++monstersCaught;
			reset();
		}
		
	}
}
