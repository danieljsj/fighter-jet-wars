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
	
	
	if (32 in keysDown) {
		if (false == laser.active) {
			
			laser.x = hero.x;
			laser.y = hero.y;
			laser.direction = hero.direction;
			laser.active = true;
			
		}
	}
	if (true == laser.active) {
		laser.y += Math.sin(laser.direction) * laser.speed * modifier;
		laser.x += Math.cos(laser.direction) * laser.speed * modifier;
		if (laser.x > 512 || laser.x < 0 || laser.y > 480 || laser.y < 0 ) {
			laser.active = false;
		}
	}

	// Are they touching?
	if (
		laser.x <= (monster.x + 16)
		&& monster.x <= (laser.x + 16)
		&& laser.y <= (monster.y + 16)
		&& monster.y <= (laser.y + 16)
	) {
		++monstersCaught;
		reset();
	}
};
