
//"use strict";

var nullFunc = function(){return null;}



/*
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
*/

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
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);





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



//======================== F L Y E R ========================//



var Flyer = Object.create(Entity);

Flyer.move = function(dT){
	var D = this.speed * dT;
	//alert("distance: " + d);
	//alert("ob.direction: " + ob.direction);
	this.y += Math.sin(ob.direction) * D;
	this.x += Math.cos(ob.direction) * D;
}



//======================== P L A N E ========================//



var Plane = Object.create(Flyer);

// Image
Plane.image = {
	src:'images/plane.png',
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
};

// Starting physical statuses
Plane.init = function(){
	Plane.p.speed 				= 0; // pixels per second
	Plane.p.x 					= Math.random()*canvas.width;
	Plane.p.y 					= Math.random()*canvas.height;
	Plane.p.direction 			= 0;

	Plane.ctrls.turning 		= 0;
	Plane.ctrls.afterburning 	= false;
	Plane.ctrls.braking 		= false;
	Plane.ctrls.tryingToFire 	= false;

	Plane.active 				= true;
} 



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





/* Plane code, in communicate, will look like this:

if (tryingToFire && readyToFire ){
	var shootingLaser = Object.create(Laser);
	shootingLaser.shooter = this;
	shootingLaser.init();
}

*/



var badGuy1 = Object.create(Plane);


var player1 = Object.create(Plane);




/* The thing to do here is to assign a keys set to each player, and let them use a standard controls func added in a Player object.
player1.control = function(){
	
	// Holding up // Afterburner
	if (38 in keysDown) { this.ctrls.afterburning = true; } else { this.ctrls.afterburning = false; }

	// Holding down // Brakes
	if (40 in keysDown) { this.ctrls.braking = true; } else { this.ctrls.braking = false; }

	// Holding left // Turn Left
	if (37 in keysDown) { this.ctrls.turning = 1; } else { this.ctrls.turning = 0; }

	// Holding right // Turn Right
	if (39 in keysDown) { this.ctrls.turning -= 1; } else { }

	// Holding spacebar // Fire
	if (32 in keysDown) { this.ctrls.tryingToFire = true; } else { this.ctrls.tryingToFire = false; }
};



*/





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