
// Reset the game when the player catches a monster
var reset = function () {
//	hero.x = canvas.width / 2;
//	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	badGuy1.x 				= Math.random()*canvas.width;
	badGuy1.y 				= Math.random()*canvas.height;
};