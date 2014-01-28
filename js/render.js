
// Draw everything
var render = function (dT) {

	ctx.clearRect(0, 0, canvas.width, canvas.height);


	player1.draw();
	player2.draw();

	
	for (i=0; i<registry.lasers.length; i++){

		registry.lasers[i].draw();
	
	}

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
