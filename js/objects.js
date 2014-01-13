
"use strict";

nullFunc = function(){return null;}





// -- IMAGES -- //

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);



function GameImage(src,height,width){
	this.ready 	= false;
	this.height = height;
	this.width 	= width;

	this.img 		= new Image();
	this.img.onload = function() { this.ready = true; }
	this.img.src 	= src;
}




// Entity

var entities[];

function Entity(imgSrc,height,width){
	// Inheritance
	// this.prototype = new Entity(imgSrc,height,width);
	// Registration
	entities.push(this);

	// Image
	this.image = new GameImage(imgSrc,height,width);

	// Communication functions:
	this.touching = function(point){ return false; }

	// Starting status:
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.direction = 0; // one of these days we'll have to do a search and replace across all the files to turn direction into dir
	this.active = false;

	// Loop functions:
	this.feel		= nullFunc;
	this.think 		= nullFunc;
	this.control 	= nullFunc;
	this.accelerate = nullFunc;
	this.move 		= nullFunc;


}


// Entity / Flyer

var flyers[]; // rename this to 'movers' !!!! THIS MAKES ME REALIZE... we need the "shadow" object...

function Flyer(imgSrc,height,width){
	// 
	this.prototype = new Entity(imgSrc,height,width);
	flyers.push(this);
	
	this.launchSpeed = 300 // arbitrary, in pixels / second


	this.baseAccel = 100 // arbitrary, in pixels / second / second
	this.baseDrag = .3 // arbitrary, no units. loss in speed per speed.

	this.launchSpeed = this.baseAccel/this.baseDrag;


	this.speed = this.launchSpeed;



	this.move = function(dT){
		var D = this.speed * dT;
		//alert("distance: " + d);
		//alert("ob.direction: " + ob.direction);
		this.y += Math.sin(ob.direction) * D;
		this.x += Math.cos(ob.direction) * D;
	}
}


// Entity / Flyer / Plane

var planes[];

function Plane(imgSrc,height,width,team){
	this.prototype = new Flyer(imgSrc,height,width);
	planes.push(this);


}







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




// Game objects

// Hero
var hero = {
	// attributes
	baseAccel: 20, // afterburnerAccel in pixels per second
	afterburnerAccel: 100, // afterburnerAccel in pixels per second
	baseDrag: .1, // base coefficient of loss of velocity per second
	brakesDrag: .4, // brakes coefficient of loss of velocity per second
	turnRate: 3, // turn rate in radians per second 

	// status
	speed: 256, // movement in pixels per second
	direction: 0,
	turning:0,
	afterburning:false,
	braking:false,
	tryingToFire:false,
	active: true,
	x: canvas.width / 2,
	y: canvas.height / 2,
};



















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






