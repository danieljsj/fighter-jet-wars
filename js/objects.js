
//"use strict";

var nullFunc = function(){return null;}




var lists = {
	'Entity':[],
	'Flyer':[],
	'Plane':[],
	'Laser':[],
};

var obGenFuncs = {
	'Entity':[],
	'Flyer':[],
	'Plane':[],
	'Laser':[],
};


/* ANATHEMA I DONT LIKE YOU 
function obGenInit(ob){

	// OBJECT NAME
	ob.obName = ob.constructor.arguments.callee.name; //replace this later when you do want to be so strict

	// INHERITANCE
	// uncomment for all but 'entity': // ob.prototype = new Entity(imgSrc,height,width);

	// REGISTRATION
	lists[ob.obName].push(ob);


	// PROPERTY AND METHOD GENERATION
	// Get the generator functions arrary for ob object function
	var genFuncs = obGenFuncs[ob.obName];
	// Run the genFuncs
	for(i=0; i<genFuncs.length; i++){
		genFuncs[i](ob);
	}

}

*/



/* ADD THIS NEXT COMMIT, ON A DIFFERENT

obGenFuncs['Flyer'].push(function(){

	this.launchSpeed = 300 // arbitrary, in pixels / second

	this.baseAccel = 100 // arbitrary, in pixels / second / second
	this.baseDrag = .3 // arbitrary, no units. loss in speed per speed.

	this.launchSpeed = this.baseAccel/this.baseDrag;


	this.speed = this.launchSpeed;

}); // can bind this to flyer if need be


*/




// -- IMAGES -- //



// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 613;
canvas.height = 528;

document.body.appendChild(canvas);



function GameImage(src,height,width){
	this.ready 	= false;
	this.height = height;
	this.width 	= width;

	this.img 		= new Image();
	this.img.onload = function() { this.ready = true; }
	this.img.src 	= src;
}



/*
	Entity
		Flyer
			Plane
				Computer
				Player
			Laser

*/

// Entity


var Entity = {
	// INHERITANCE
	// uncomment for all but 'entity': // this.prototype = new Entity(imgSrc,height,width);




	// Communication functions:
	comm: {
		touching: function(point){ return false; },
	},

	// Permanent attributes: 
	// (none yet)

	// Starting physical status:
	p: {
		x: canvas.width/2,
		y: canvas.height/2,
		direction: 0, // one of these days we'll have to do a search and replace across all the files to turn direction into dir
	},

	// Loop funcs:
	loop: {
		feel		: nullFunc,
		think 		: nullFunc,
		control 	: nullFunc,
		accelerate	: nullFunc,
		move 		: nullFunc,
	},

	// Activate it! (NOT)
	active: false,
}



// Entity / Flyer

var Flyer = Object.create(Entity);

// HERECODED PROPERTIES
// PermaAttributes
Flyer.atts = {
	baseAccel: 100, // arbitrary, in pixels / second / second
	baseDrag: .3, // arbitrary, no units. loss in speed per speed.
	launchSpeed: baseAccel/baseDrag, // arbitrary, in pixels / second
}

// Starting status
Flyer.p.speed = this.atts.launchSpeed;



Flyer.loop.move = function(dT){
	var D = this.speed * dT;
	//alert("distance: " + d);
	//alert("ob.direction: " + ob.direction);
	this.y += Math.sin(ob.direction) * D;
	this.x += Math.cos(ob.direction) * D;
}

// Entity / Flyer / Plane


var Plane = Object.create(Flyer);

// HERECODED PROPERTIES AND METHODS
// Image
Plane.image = new GameImage('images/plane.png',32,32);

// HERECODED PROPERTIES
// Permanent attributes
Plane.atts.baseAccel  		= 20; 	// afterburnerAccel in pixels per second
Plane.atts.afterburnerAccel = 100; 	// afterburnerAccel in pixels per second
Plane.atts.baseDrag	 		= 0.1; 	// base coefficient of loss of velocity per second
Plane.atts.brakesDrag 		= 0.4; 	// brakes coefficient of loss of velocity per second
Plane.atts.turnRate	 		= 3; 		// turn rate in radians per second

// Starting controls statuses
Plane.ctrls = {};
Plane.ctrls.turning 		= 0;
Plane.ctrls.afterburning 	= false;
Plane.ctrls.braking 		= false;
Plane.ctrls.tryingToFire 	= false;

// Starting physical statuses
Plane.p.speed 				= 256; // movement in pixels per second
Plane.p.x 					= Math.random()*canvas.width;
Plane.p.y 					= Math.random()*canvas.height;
Plane.p.direction 			= 0;

// Activate it.
Plane.active = true;



var Laser = Object.create(Flyer);

Laser.image = new GameImage('images/laser.png',32,32);
// HERECODED PROPERTIES
// Permanent attributes
Laser.atts.baseAccel  		= 0; 	// afterburnerAccel in pixels per second
Laser.atts.baseDrag	 		= 0.3; 	// base coefficient of loss of velocity per second
Laser.atts.launchSpeed		= 700; 	// launch speed in pixels per ssecond

Laser.p = {};

Laser.owner = null;

Laser.init = function(shooter){
	this.owner = shooter;
	this.p.speed 			= shooter.speed + this.p.atts.launchSpeed; // movement in pixels per second
	this.p.direction 		= shooter.direction;
	this.p.x 				= shooter.x;
	this.p.y 				= shooter.y;
}

// Activate it!
Laser.active = false;


/* Plane code will look like this:

if (tryingToFire && readyToFire ){
	var shootingLaser = Object.create(Laser);
	shootingLaser.init(ob); // WORRY: WHAT WILL "THIS" BE? WILL IT BE THE PLANE? OR ONE OF ITS SUB-PROPERTIES?
}

*/

var badGuy1 = Object.create(Plane);
var player1 = Object.create(Plane);

console.log(player1);







/*


// Hero image
hero.image.ready = false;
hero.image = new Image();
hero.Image.onload = function () {
	hero.image.ready = true;
};
heroImage.src = "images/hero.png";

var laser = {
	
	// attributes
	baseAccel: 0, // afterburnerAccel in pixels per second
	afterburnerAccel: 0, // afterburnerAccel in pixels per second
	baseDrag: 0, // base coefficient of loss of velocity per second
	brakesDrag: 0, // brakes coefficient of loss of velocity per second
	turnRate: 0, // turn rate in radians per second 
	
	launchSpeed:700, // speed in pixels per second
	
	speed: 0, // speed in pixels per second
	active: false,
	direction: 0,
	x: canvas.width / 2,
	y: canvas.height / 2,	
	
	move: function(dT){
		var d = laser.speed * dT;
		laser.y += Math.sin(laser.direction) * d;
		laser.x += Math.cos(laser.direction) * d;
	}
}



// Monster

var monster = {};

//Building1

var bldg1 = {


	width: 175,
	height: 95,

	image: {			
		offsetX:11,
		offsetY:-12,
	},
	
	direction: 0,
	
	// Throw the building somewhere on the screen randomly
	// Right now no bias towards center or anything
	x: Math.random() * canvas.width,
	y: Math.random() * canvas.height,
}

// Building 1 image
bldg1.image.img = new Image();
//bldg1.image.width;
//bldg1.image.height;
bldg1.image.img.onload = function () {
	bldg1.image.ready = true;
};
bldg1.image.ready = false;
bldg1.image.img.src = "images/bldg1.png";



// Score

var monstersCaught = 0;




// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

console.log(bgImage);

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Laser image
var laserReady = false;
var laserImage = new Image();
laserImage.onload = function () {
	laserReady = true;
};
laserImage.src = "images/laser.png";


// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";



//*/