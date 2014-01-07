// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up // Afterburner
		hero.afterburning = true;
	} else {
		hero.afterburning = false;
	}
	if (40 in keysDown) { // Player holding down // Brakes
		hero.braking = true;
	} else {
		hero.braking = false;
	}

	if (37 in keysDown) { // Player holding left // Turn Left
		hero.direction -= hero.turning * hero.turnRate * modifier; // why negative?
	}
	if (39 in keysDown) { // Player holding right // Turn Right
		hero.direction += hero.turnRate * modifier; // why negative?
	}	
	if (32 in keysDown) {
		hero.tryingToFire = true;
	}
/*

	if (38 in keysDown) { // Player holding up // Afterburner
		hero.speed += hero.afterburnerAccel * modifier;
	}
	if (40 in keysDown) { // Player holding down // Brakes
		hero.speed *= 1-(hero.brakesDrag * modifier); 
	}
	if (37 in keysDown) { // Player holding left // Turn Left
		hero.direction -= hero.turnRate * modifier; // why negative?
	}
	if (39 in keysDown) { // Player holding right // Turn Right
		hero.direction += hero.turnRate * modifier; // why negative?
	}	
	if (hero.direction > 3.141592654*2) {
		hero.direction -=3.141592654*2;
	}
	if (hero.direction < -3.141592654*2) {
		hero.direction -=-3.141592654*2;
	}
*/

	
	move(hero, modifier);
	
	move(laser, modifier);

	senseEnvironment(laser);



};






function move(ob, dT){

	if (ob.active){

		// -- THRUST -- //

		// Base Thrust
		ob.speed += ob.baseAccel * dT;

		// Afterburning Thrust
		if (ob.afterburning) {
			ob.speed += ob.afterburnerAccel * dT;
		}


		// -- DRAG -- //

		// Base Drag
		ob.speed *= 1-(ob.baseDrag * dT);

		// Braking Drag
		if (ob.braking){
			ob.speed *= 1-(ob.brakesDrag * dT);
		}	


		// -- TURNING -- //

		// Turning
		ob.direction -= ob.turning * ob.turnRate * dT; // why negative?

		// Reign in the radians
		if (ob.direction > 3.141592654*2) {
			ob.direction -=3.141592654*2;
		}
		if (ob.direction < -3.141592654*2) {
			ob.direction -=-3.141592654*2;
		}

		// -- ADVANCEMENT -- //

		var d = ob.speed * dT;
		ob.y += Math.sin(ob.direction) * d;
		ob.x += Math.cos(ob.direction) * d;	

	}

}
 


function senseEnvironment(ob){
	if (true == ob.active) {

		// Am I touching the outer border?
		if (ob.x > 512 || ob.x < 0 || ob.y > 480 || ob.y < 0 ) {
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