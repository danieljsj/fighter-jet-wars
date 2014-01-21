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
	



	
	// Score
	
	var lineHeight = 32;
	var i = 0;
	
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("player1 speed: " 	+ player1.p.speed, 	lineHeight, ++i*lineHeight);
	ctx.fillText("player1 burns: " 	+ player1.p.afterburning, 	lineHeight, ++i*lineHeight);
	ctx.fillText("Interval (ms): " 	+ dT, 	lineHeight, ++i*lineHeight);


};
