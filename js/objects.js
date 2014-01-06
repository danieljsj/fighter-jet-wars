
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

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {

	afterburnerAccel: 100, // afterburnerAccel in pixels per second
	baseAccel: 20, // afterburnerAccel in pixels per second
	baseDrag: .1, // base coefficient of loss of velocity per second
	brakesDrag: .4, // brakes coefficient of loss of velocity per second
	turnRate: 3, // turn rate in radians per second 


	speed: 256, // movement in pixels per second
	direction:0,

};

// Set initial hero locale

hero.x = canvas.width / 2;
hero.y = canvas.height / 2;


var monster = {};
var monstersCaught = 0;
