
"use strict";

// -- IMAGES -- //

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

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






//////////////////////////////////////////



