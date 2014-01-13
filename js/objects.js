
"use strict";

nullFunc = function(){return null;}




var lists = [];
var obGenFuncs = {};



function obGenInit(ob){

	// OBJECT NAME
	ob.obName = ob.constructor.arguments.callee.name;

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

var entities[];

function Entity(imgSrc,height,width){
	obGenInit(this);

	// INHERITANCE
	// uncomment for all but 'entity': // this.prototype = new Entity(imgSrc,height,width);


	// HERECODED PROPERTIES AND METHODS
	// Image
	this.image = new GameImage(imgSrc,height,width);

	// Communication functions:
	this.touching = function(point){ return false; }

	// Permanent attributes: 
	// (none yet)

	// Starting status:
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.direction = 0; // one of these days we'll have to do a search and replace across all the files to turn direction into dir
	this.active = false;

	// Loop funcs:
	this.loop.feel		 = nullFunc;
	this.loop.think 	 = nullFunc;
	this.loop.control 	 = nullFunc;
	this.loop.accelerate = nullFunc;
	this.loop.move 	 	 = nullFunc;

}


// Entity / Flyer

function Flyer(imgSrc,height,width){
	// INIT
	obGenInit(this);

	// PROTOTYPE
	this.prototype = new Entity(imgSrc,height,width);
	
	// HERECODED PROPERTIES
	// PermaAttributes
	this.atts.baseAccel = 100 // arbitrary, in pixels / second / second
	this.atts.baseDrag = .3 // arbitrary, no units. loss in speed per speed.
	this.atts.launchSpeed = this.atts.baseAccel/this.atts.baseDrag; // arbitrary, in pixels / second

	// Starting status
	this.speed = this.atts.launchSpeed;



	this.loop.move = function(dT){
		var D = this.speed * dT;
		//alert("distance: " + d);
		//alert("ob.direction: " + ob.direction);
		this.y += Math.sin(ob.direction) * D;
		this.x += Math.cos(ob.direction) * D;
	}
}


// Entity / Flyer / Plane


function Plane(){
	// INIT
	obGenInit(this);

	// PROTOTYPE
	this.prototype = new Flyer('images/hero.png',32,32); // I maybe should use properties instead of hardcode here, cuz maybe it can inherit from the more advanced/specific object

	// HERECODED PROPERTIES
	// Atts
	this.atts.baseAccel  		= 20; 	// afterburnerAccel in pixels per second
	this.atts.afterburnerAccel 	= 100; 	// afterburnerAccel in pixels per second
	this.atts.baseDrag	 		= 0.1; 	// base coefficient of loss of velocity per second
	this.atts.brakesDrag 		= 0.4; 	// brakes coefficient of loss of velocity per second
	this.atts.turnRate	 		= 3; 		// turn rate in radians per second

	// Starting properties
	this.speed 			= 256; // movement in pixels per second
	this.turning 		= 0;
	this.afterburning 	= false;
	this.braking 		= false;
	this.tryingToFire 	= false;
	this.active 		= true;
	this.x 				= Math.random()*canvas.width;
	this.y 				= Math.random()*canvas.height;
	this.direction 		=   0;

}


function Laser(shooter){
	//INIT
	obGenInit(this);

	this.prototype = new Flyer('images/laser.png',32,32);

	// HERECODED PROPERTIES
	// Atts
	this.atts.baseAccel  		= 0; 	// afterburnerAccel in pixels per second
	this.atts.baseDrag	 		= 0.3; 	// base coefficient of loss of velocity per second
	this.atts.launchSpeed		= 700; 	// launch speed in pixels per second

	// Starting properties
	this.speed 			= shooter.speed + this.atts.launchSpeed; // movement in pixels per second
	this.active 		= true;
	this.x 				= shooter.x;
	this.y 				= shooter.y;
	this.direction 		= shooter.direction;

}















// Hero image
/*hero.image.ready = false;
hero.image = new Image();
hero.Image.onload = function () {
	hero.image.ready = true;
};
heroImage.src = "images/hero.png";
*/


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







