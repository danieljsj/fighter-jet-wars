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