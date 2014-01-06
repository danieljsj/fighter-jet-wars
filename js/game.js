// Daniel is cool

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
var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var drawRotated = function (image, x, y, direction, readyboolean) {

	if (readyboolean) {
		ctx.translate(+1*x, +1*y)
		ctx.rotate(+1*direction);
		ctx.translate(-32/2, -32/2)
		ctx.drawImage(image, 0, 0);
		ctx.translate(+32/2, +32/2)
		ctx.rotate(-1*direction);
		ctx.translate(-1*x, -1*y)
	}

}


// Set initial hero locale

hero.x = canvas.width / 2;
hero.y = canvas.height / 2;

// Reset the game when the player catches a monster
var reset = function () {
//	hero.x = canvas.width / 2;
//	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};


// Update game objects
var update = function (modifier) {
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

	hero.speed += hero.baseAccel * modifier;

	hero.speed *= 1-(hero.baseDrag * modifier);
	
	hero.y += Math.sin(hero.direction) * hero.speed * modifier;
	hero.x += Math.cos(hero.direction) * hero.speed * modifier;
	

	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};



// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}


	
	drawRotated(heroImage, hero.x, hero.y, hero.direction, heroReady);
	drawRotated(monsterImage, monster.x, monster.y, 0, monsterReady);
	


	
	
	
	
	// Score
	
	var i = 0;
	
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, ++i*32);
//	ctx.fillText("Hero direction: " + hero.direction, 32, ++i*32);
//	ctx.fillText("Hero speed: " + hero.speed, 32, ++i*32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible