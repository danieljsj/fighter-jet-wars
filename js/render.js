var drawRotated = function (image, x, y, direction, readyboolean) {

	if (readyboolean) {

		ctx.translate(+1*x, +1*y)
		ctx.rotate(+1*direction);
		ctx.translate(-image.width/2, -image.height/2)
		ctx.drawImage(image.img, 0, 0);
		ctx.translate(+image.width/2, +image.height/2)
		ctx.rotate(-1*direction);
		ctx.translate(-1*x, -1*y)
	}

}



// Draw everything
var render = function (dT) {

	ctx.clearRect(0, 0, canvas.width, canvas.height);

//	drawRotated(   bldg1.image.img,    bldg1.x+bldg1.image.offsetX,    bldg1.y+bldg1.image.offsetY,    0,    bldg1.image.ready)

	drawRotated(player1.image, 	player1.p.x, 	player1.p.y, 	player1.p.direction, player1.image.img.ready);
	drawRotated(player2.image, 	player2.p.x, 	player2.p.y, 	player2.p.direction, player2.image.img.ready);
//	drawRotated(comp1  .image, 	comp1  .p.x, 	comp1  .p.y, 	comp1  .p.direction, comp1  .image.img.ready);
	

	
	for (i=0; i<registry.lasers.length; i++){

		registry.lasers[i].draw();
	
	}

	
	// Score
	
	var lineHeight = 32;
	var i = 0;
	
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Interval (ms): " 	+ dT, 	lineHeight, ++i*lineHeight);

	ctx.fillText("player1.p.speed: " 	+ player1.p.speed, 	lineHeight, ++i*lineHeight);

	ctx.fillText("player1.ctrls.afterburning: " + player1.ctrls.afterburning, 	lineHeight, ++i*lineHeight ); 	
	ctx.fillText("player1.ctrls.braking		: " + player1.ctrls.braking		, 	lineHeight, ++i*lineHeight ); 			
	ctx.fillText("player1.ctrls.turning		: " + player1.ctrls.turning		, 	lineHeight, ++i*lineHeight ); 		
	ctx.fillText("player1.ctrls.tryingToFire: " + player1.ctrls.tryingToFire, 	lineHeight, ++i*lineHeight ); 	 

	ctx.fillText("player1.stats.laserRefreshLeft: " + player1.stats.laserRefreshLeft, 	lineHeight, ++i*lineHeight ); 	



};
