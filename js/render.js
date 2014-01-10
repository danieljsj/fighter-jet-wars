var drawRotated = function (image, x, y, direction, readyboolean) {

	if (readyboolean) {
		ctx.translate(+1*x, +1*y)
		ctx.rotate(+1*direction);
		ctx.translate(-32/2, -32/2)
		ctx.drawImage(image, 0, 0);
		// should set all this to ctx.restore()
		ctx.translate(+32/2, +32/2)
		ctx.rotate(-1*direction);
		ctx.translate(-1*x, -1*y)
	}

}



// Draw everything
var render = function () {


	// Monsters

	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}


	
	drawRotated(heroImage, hero.x, hero.y, hero.direction, heroReady);

	drawRotated(monsterImage, monster.x, monster.y, 0, monsterReady);
	
	if(true == laser.active){
		drawRotated(laserImage, laser.x, laser.y, laser.direction, laserReady);
	}


	
	// Score
	
	var lineHeight = 32;
	var i = 0;
	
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Planes Destroyed: "	+ monstersCaught, 	lineHeight, ++i*lineHeight);
/*	ctx.fillText("Hero direction: " 	+ hero.direction, 	lineHeight, ++i*lineHeight);
	ctx.fillText("Hero x: " 			+ hero.x, 			lineHeight, ++i*lineHeight);
	ctx.fillText("Hero speed: " 		+ hero.speed, 		lineHeight, ++i*lineHeight);
	ctx.fillText("Hero tryin to fire: " + hero.tryingToFire,lineHeight, ++i*lineHeight);
	ctx.fillText("Laser active: " 		+ laser.active, 	lineHeight, ++i*lineHeight);
	ctx.fillText("Laser y: " 			+ laser.y, 			lineHeight, ++i*lineHeight);
	ctx.fillText("Laser x: " 			+ laser.x, 			lineHeight, ++i*lineHeight);
	ctx.fillText("Laser direction: " 	+ laser.direction, 	lineHeight, ++i*lineHeight);
	ctx.fillText("Laser speed: " 		+ laser.speed, 		lineHeight, ++i*lineHeight);
	ctx.fillText("Laser X: " 			+ laser.x, 			lineHeight, ++i*lineHeight);
	ctx.fillText("Laser Y: " 			+ laser.y, 			lineHeight, ++i*lineHeight); */


};
