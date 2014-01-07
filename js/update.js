
"use strict";

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
	hero.turning = 0;
	if (37 in keysDown) { // Player holding left // Turn Left
		hero.turning += 1;
	}
	if (39 in keysDown) { // Player holding right // Turn Right
		hero.turning -= 1;
	}	
	if (32 in keysDown) { // Player holding spacebar // Fire
		hero.tryingToFire = true;
	} else {
		hero.tryingToFire = false;
	}
	
	
	
	move(hero, modifier);
		
	laser.move(modifier);

	senseEnvironment(laser);



	if(true == hero.tryingToFire && false == laser.active){
		laser.x=hero.x;
		laser.y=hero.y;
		laser.direction=hero.direction;
		laser.active=true;
		laser.speed = laser.launchSpeed + hero.speed;
	}

};

console.log(hero);


var firstTime = 0;

function move(ob, dT){

//alert(ob.turning);


	if (0 == firstTime++){ console.log( ob ); }

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
		//alert("distance: " + d);
		//alert("ob.direction: " + ob.direction);
		ob.y += Math.sin(ob.direction) * d;
		ob.x += Math.cos(ob.direction) * d;	

	}
//*/
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
