'use strict';
//== Entity > Flyer > Plane > 
//======================== P L A Y E R ========================//

function Player() { 
	// Superclass stuff builds this
	Plane.apply(this);  // THIS IS SO YOU GET X AND Y GENERATED NOW AND INDEPENDENTLY.
	
	this.shadowIcon = {
		src:'images/plane-friendly-shadow.png',
		height:52,
		width:52,
	}

	this.inits.push({
		handle: 'register',
		order: 200,
		func: function(){
			registries.players.push(this);
		}
	});
}; 			

Player.prototype = Object.create(Plane.prototype); 	// THIS IS SO YOU GET FUNCTIONS.
Player.prototype.constructor = Player; 				// WHY DO I NEED THIS? (TRY WITHOUT...)


Player.prototype.control = function(){  // Eventually, these could be bundled into hooks just like init is bundled.
	
	// Holding up // Afterburner
	if (this.keys.burn in keysDown) { this.ctrls.afterburning = true; } else { this.ctrls.afterburning = false; }

	// Holding down // Brakes
	if (this.keys.brake in keysDown) { this.ctrls.braking = true; } else { this.ctrls.braking = false; }

	// Holding left // Turn Left
	if (this.keys.left in keysDown) { this.ctrls.turning = 1; } else { this.ctrls.turning = 0; }

	// Holding right // Turn Right
	if (this.keys.right in keysDown) { this.ctrls.turning -= 1; } else { }

	// Holding spacebar // Fire
	if (this.keys.shoot in keysDown) { this.ctrls.tryingToFire = true; } else { this.ctrls.tryingToFire = false; }

};



// -=-=-=-=-=-=- PLAYERS -=-=-=-=-=-=- //

// Player 1
var player1 = new Player();

player1.keys = {
	burn: 	38,	// up
	brake: 	40,	// down
	left: 	37,	// left
	right: 	39,	// right
	shoot: 	76,	// L
}

player1.image = {
	src:'images/plane-friendly-blue.png',
	height:32,
	width:32,
}

console.info("player1:");
console.log(player1);

// Player 2
var player2 = new Player();

player2.keys = {
	burn: 	87,	// W
	brake: 	83,	// S
	left: 	65,	// A
	right: 	68,	// D
	shoot: 	32,	// space
}

player2.image = {
	src:'images/plane-friendly-yellow.png',
	height:32,
	width:32,
}

console.info("player2:");
console.log(player2);
