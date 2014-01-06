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
	
	var i = 0;
	
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins shot: " + monstersCaught, 32, ++i*32);
//	ctx.fillText("Hero direction: " + hero.direction, 32, ++i*32);
//	ctx.fillText("Hero speed: " + hero.speed, 32, ++i*32);
//	ctx.fillText("Laser X: " + laser.x, 32, ++i*32);
//	ctx.fillText("Laser Y: " + laser.y, 32, ++i*32);


};
