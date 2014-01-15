
//"use strict";

var nullFunc = function(){return null;}







// -- CANVAS -- //



// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

// -- REGISTRY -- //

var registry = {
	entities: [],
};


//=======================================================================//
//======================== O  B  J  E  C  T  S   ========================//
//=======================================================================//


/*
	Flyer
		Plane
			Computer
			Player
		Laser
*/




//======================== E N T I T Y ========================//


var Entity = {};

Entity.init = function(){

	this.inits.sort(  function(a,b){return a.order - b.order;}  );

	for (i=0; i<this.inits.length; i++){
		var initFunc = this.inits[i];
		var boundInitFunc = initFunc.bind(this);
		initFunc(); 		// log: undefined
		boundInitFunc(); 	// log: Hello World
	}
};


// Set inits for entities
Entity.inits = [];

Entity.inits.push({
	handle: 'giveImage',
	order: 100,
	func: function(){
		this.image.img 			= new Image();
		this.image.img.ready 	= false;
		this.image.img.onload 	= function() { this.ready = true; }
		this.image.img.src 		= this.image.src;
	}

});

Entity.inits.push({
	handle: 'activate',
	order: 120,
	func: function(){
		this.active = true;
	},
});

Entity.inits.push({
	handle: 'register',
	order: 0,
	func: function(){
		registry.entities.push(this);
	},
});


//== Entity >
//======================== F L Y E R ========================//



var Flyer = Object.create(Entity);

Flyer.move = function(dT){
	var D = this.speed * dT;
	//alert("distance: " + d);
	//alert("ob.direction: " + ob.direction);
	this.y += Math.sin(ob.direction) * D;
	this.x += Math.cos(ob.direction) * D;
}


//== Entity > Flyer > 
//======================== P L A N E ========================//



var Plane = Object.create(Flyer);

// Image
Plane.image = {
	src:'images/plane-friendly-gray.png',
	height:32,
	width:32,
}

// Permanent attributes
Plane.atts = {
	baseAccel  			: 20, 	// afterburnerAccel in pixels per second^2
	afterburnerAccel 	: 100, 	// afterburnerAccel in pixels per second^2
	baseDrag	 		: 0.1, 	// base coefficient of loss of velocity per second
	brakesDrag 			: 0.4, 	// brakes coefficient of loss of velocity per second
	turnRate	 		: 3, 	// turn rate in radians per second
	laserRefreshTime	: .25	// 
};

Plane.sta = {
	unreadiness
}



Entity.inits.push({
	handle: 'setStartingStatuses',
	order: 0,
	func: function(){

		// set Physical statuses
		this.p.speed 		= 0; // pixels per second
		this.p.x 			= Math.random()*canvas.width;
		this.p.y 			= Math.random()*;
		this.p.direction 	= Math.atan( 
			( 
				canvas.height / 2  -  this.p.y 
			)/(
				canvas.width  / 2  -  this.p.x
			)
		);

		// set Controls statuses
		this.ctrls.turning 		= 0;
		this.ctrls.afterburning	= false;
		this.ctrls.braking 		= false;
		this.ctrls.tryingToFire = false;

		// Set Various statuses
		this.stats.laserRefreshLeft

		// Activate
		this.active	= true;

	},
});




//== Entity > Flyer > Plane > 
//======================== P L A Y E R ========================//

var Player = Object.create(Plane);


Player.control = function(){  // Eventually, these could be bundled into hooks just like init is bundled.
	
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



Player.communicate = function(){ // Eventually, these could be bundled into hooks just like init is bundled.

	// Fire Laser
	if (tryingToFire && readyToFire ){

		// Create a laser
		var shootingLaser = Object.create(Laser);
		// Tell it who is shooting it
		shootingLaser.shooter = this;
		// Start it on its way
		shootingLaser.init();
	}

}

// -=-=-=-=-=-=- PLAYERS -=-=-=-=-=-=- //

// Player 1
var player1 = Object.create(Player);

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

// Player 2
var player2 = Object.create(Player);

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



//== Entity > Flyer > Plane > 
//======================== C O M P U T E R ========================//

var Computer = Object.create(Plane);





// -=-=-=-=-=-=- COMPUTERS -=-=-=-=-=-=- //

var badGuy1 = Object.create(Computer);






//== Entity > Flyer >
//======================== L A S E R ========================//



var Laser = Object.create(Flyer);

// Image
Laser.image = {
	src:'images/laser.png',
	height:32,
	width:32,
}

// Permanent attributes
Laser.atts = {
	baseAccel  	: 0, 	// afterburnerAccel in pixels per second
	baseDrag	: 0.3, 	// base coefficient of loss of velocity per second
	launchSpeed	: 700, 	// launch speed in pixels per ssecond
}

Laser.p = {};

Laser.owner = null;

Laser.inits.push({
	handle: 'launch',
	order: 90,
	func: function(){
		this.p.speed 			= shooter.speed + this.p.atts.launchSpeed; // movement in pixels per second
		this.p.direction 		= shooter.direction;
		this.p.x 				= shooter.x;
		this.p.y 				= shooter.y;
	},
});




























