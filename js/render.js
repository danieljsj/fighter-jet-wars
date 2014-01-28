
// Draw everything
var render = function (dT) {

	ctx.clearRect(0, 0, canvas.width, canvas.height);


	
	for (i=0; i<registries.planes.length; i++){

		registries.planes[i].draw();
	
	}

	for (i=0; i<registries.lasers.length; i++){

		registries.lasers[i].draw();
	
	}

	drawStatsBoard(dT);

};






var drawStatsBoard = function(dT){

	var lineHeight = 32;
	var i = 0;
	
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Interval (ms): " 	+ dT, 	lineHeight, ++i*lineHeight);
/*
	ctx.fillText("player1.p.speed: " 	+ player1.p.speed, 	lineHeight, ++i*lineHeight);
	ctx.fillText("player1.p.direction: "+ player1.p.direction,lineHeight,++i*lineHeight);
	ctx.fillText("player1.p.x: " 		+ player1.p.y, 		lineHeight, ++i*lineHeight);
	ctx.fillText("player1.p.y: " 		+ player1.p.y, 		lineHeight, ++i*lineHeight);

	ctx.fillText("player1.ctrls.afterburning: " + player1.ctrls.afterburning, 	lineHeight, ++i*lineHeight ); 	
	ctx.fillText("player1.ctrls.braking		: " + player1.ctrls.braking		, 	lineHeight, ++i*lineHeight ); 			
	ctx.fillText("player1.ctrls.turning		: " + player1.ctrls.turning		, 	lineHeight, ++i*lineHeight ); 		
	ctx.fillText("player1.ctrls.tryingToFire: " + player1.ctrls.tryingToFire, 	lineHeight, ++i*lineHeight ); 	 

	ctx.fillText("player1.stats.laserRefreshLeft: " + player1.stats.laserRefreshLeft, 	lineHeight, ++i*lineHeight ); 	



	ctx.fillText("player2.p.speed: " 	+ player2.p.speed, 	lineHeight, ++i*lineHeight);
	ctx.fillText("player2.p.direction: "+ player2.p.direction,lineHeight,++i*lineHeight);
	ctx.fillText("player2.p.x: " 		+ player2.p.y, 		lineHeight, ++i*lineHeight);
	ctx.fillText("player2.p.y: " 		+ player2.p.y, 		lineHeight, ++i*lineHeight);

	ctx.fillText("player2.ctrls.afterburning: " + player2.ctrls.afterburning, 	lineHeight, ++i*lineHeight ); 	
	ctx.fillText("player2.ctrls.braking		: " + player2.ctrls.braking		, 	lineHeight, ++i*lineHeight ); 			
	ctx.fillText("player2.ctrls.turning		: " + player2.ctrls.turning		, 	lineHeight, ++i*lineHeight ); 		
	ctx.fillText("player2.ctrls.tryingToFire: " + player2.ctrls.tryingToFire, 	lineHeight, ++i*lineHeight ); 	 

	ctx.fillText("player2.stats.laserRefreshLeft: " + player2.stats.laserRefreshLeft, 	lineHeight, ++i*lineHeight ); 	
*/

}