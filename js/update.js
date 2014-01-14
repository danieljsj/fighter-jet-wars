
"use strict";

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up // Afterburner
		player1.ctrls.afterburning = true;
	} else {
		player1.ctrls.afterburning = false;
	}
	if (40 in keysDown) { // Player holding down // Brakes
		player1.ctrls.braking = true;
	} else {
		player1.ctrls.braking = false;
	}
	player1.ctrls.turning = 0;
	if (37 in keysDown) { // Player holding left // Turn Left
		player1.ctrls.turning += 1;
	}
	if (39 in keysDown) { // Player holding right // Turn Right
		player1.ctrls.turning -= 1;
	}	
	if (32 in keysDown) { // Player holding spacebar // Fire
		player1.ctrls.tryingToFire = true;
	} else {
		player1.ctrls.tryingToFire = false;
	}
	
	
	player1.move(modifier);

	player1.loop.accelerate(modifier); //ACTUALLY HAVE TO MAKE THIS!!!!!!!!!!!!!!!!!!!
		
	laser.move(modifier);


	senseEnvironment(laser); /// WHAT DO WE ACTUALLY HAVE HERE
	
	// Sensing for Buildings;
	// currently only in static square
	 
	if (senseBuilding(hero.x,hero.y) === true) {
		alert('you suck');
	}
	
	if(true == hero.tryingToFire && false == laser.active){
		laser.x=hero.x;
		laser.y=hero.y;
		laser.direction=hero.direction;
		laser.active=true;
		laser.speed = laser.launchSpeed + hero.speed;
	}

};



var firstTime = 0;

function move(ob, dT){

//alert(ob.turning);


	if (0 == firstTime++){ console.log( ob ); }

	if (ob.active){





		// -- ADVANCEMENT -- //

/* THIS IS stuff.move, and it already has that. sukit.
		var d = ob.speed * dT;
		//alert("distance: " + d);
		//alert("ob.direction: " + ob.direction);
		ob.y += Math.sin(ob.direction) * d;
		ob.x += Math.cos(ob.direction) * d;	

*/
	}


}
 
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
