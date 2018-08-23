'use strict';
var lastDrawn = 0;

var viewPoint;

// Draw everything
var render = function (dT) {

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// viewPoint = {x:0,y:0}
	viewPoint = {x: registries.players[0].p.x, y: registries.players[0].p.y + 32,}
	
	for (var i=0; i<registries.planes.length; i++){

		registries.planes[i].draw(viewPoint);
	
	}

	for (var i=0; i<registries.lasers.length; i++){

		registries.lasers[i].draw(viewPoint);
	
	}

	lastDrawn += dT;


	if (lastDrawn > 0.2) {
		lastDrawn = 0;
		if (lMap) {
			lMap.setView(latLngFromXY(viewPoint.x,viewPoint.y), 12);
		}
		// console.log(lat,lng);
		// console.log(lat-homeLat,lng-homeLng);

	}
	
	drawStatsBoard(dT);


};






var drawStatsBoard = function(dT){

	var lineHeight = 24;
	var i = 0;
	
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.font = "bold 18px mono";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	// ctx.fillStyle = "#888888";
	// ctx.fillText("Frames per second: " 	+ Math.round(1/dT), 			lineHeight, ++i*lineHeight);
	// ctx.fillText(" ", 													lineHeight, ++i*lineHeight);
	ctx.fillStyle = "#33788A";
	ctx.fillText("Player 1 RespawnsLeft: " + player1.stats.lives, 		lineHeight, ++i*lineHeight);
	ctx.fillText("Player 1 HitsScored:   " + player1.stats.killCount,	lineHeight, ++i*lineHeight);
	ctx.fillText(" ", 													lineHeight, ++i*lineHeight);
	ctx.fillStyle = "#8A6903";
	ctx.fillText("Player 2 RespawnsLeft: " + player2.stats.lives, 		lineHeight, ++i*lineHeight);
	ctx.fillText("Player 2 HitsScored:   " + player2.stats.killCount,	lineHeight, ++i*lineHeight);
	ctx.fillText(" ", 													lineHeight, ++i*lineHeight);
	ctx.fillStyle = "#B44A4B";
	ctx.fillText("Comp 1   RespawnsLeft: " + comp1.stats.lives, 		lineHeight, ++i*lineHeight);
	ctx.fillText("Comp 1   HitsScored:   " + comp1.stats.killCount,		lineHeight, ++i*lineHeight);
	ctx.fillText(" ", 													lineHeight, ++i*lineHeight);
	ctx.fillText("Comp 2   RespawnsLeft: " + comp2.stats.lives, 		lineHeight, ++i*lineHeight);
	ctx.fillText("Comp 2   HitsScored:   " + comp2.stats.killCount,		lineHeight, ++i*lineHeight);


	// ctx.fillText("Comp 1 Direction: " 		+ comp1.p.direction, 		lineHeight, ++i*lineHeight);
	// ctx.fillText("Comp 1 Target Offset: " 		+ comp1.thoughts.targetAngularOffset, 		lineHeight, ++i*lineHeight);
	// ctx.fillText("Comp 1 Target directionToOb: " 		+ comp1.directionToOb, 		lineHeight, ++i*lineHeight);

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



	ctx.fillText("player2.stats.dead: " + player2.stats.dead, 	lineHeight, ++i*lineHeight ); 	
	ctx.fillText("player2.stats.respawnTimeLeft: " + player2.stats.respawnTimeLeft, 	lineHeight, ++i*lineHeight ); 	
	ctx.fillText("player2.stats.respawnReady: " + player2.stats.respawnReady, 	lineHeight, ++i*lineHeight ); 	
//*/

}