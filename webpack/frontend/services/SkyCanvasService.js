'use strict';


var canvas, ctx;

function initCanvas(canvasId){

	if (canvas) return;

	// Create the canvas
	canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	// canvas.style["z-index"] = 1;
	ctx = canvas.getContext("2d");

	// Canvas resizing
	// function setCanvasWidth(){
	// 	canvas.width = window.innerWidth*1;
	// 	canvas.height = window.innerHeight*1;
	// }

	// window.onload 	= setCanvasWidth;
	// window.onresize = setCanvasWidth;
	// setInterval(setCanvasWidth, 1000);

}



function renderEntities(entities){
	// centerPoint = {x: registries.players[0].p.x, y: registries.players[0].p.y + 32,}
	var centerPoint = {x:0,y:0};

	clear();

	entities.forEach(function(entity){
		draw(entity, centerPoint);
	});

}

function clear(){
	ctx.setTransform(1,0,0,1,0,0); // (scaleX, skewX, skewY, scaleY, translateX, translateY);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw(entity, centerPoint){
	

	var e = entity;

	// reset:
	ctx.setTransform(1,0,0,1,0,0); // (scaleX, skewX, skewY, scaleY, translateX, translateY);
	ctx.translate(canvas.width / 2, canvas.height / 2); // shift ctx to center of canvas
	// based on p
	ctx.translate(e.p.x-centerPoint.x, e.p.y-centerPoint.y); // shift to entity's position relative to centerpoint		
	ctx.rotate(e.p.direction);

	// based on Img
	var canvasImage = e.getCanvasImage();
	ctx.translate(-canvasImage.width/2, -canvasImage.height/2); // MAYBE FOLD THIS INTO DRAWIMAGE?? ALSO... A BIT WEIRD THAT THIS IS HAPPENING AFTER THE ROTATE, EH?
	try{
		ctx.drawImage(canvasImage.domImage, 0, 0);
	} catch(err) {
		console.log("IMAGE NOT READY YET");
	}

}


module.exports = {
	initCanvas: initCanvas,
	renderEntities: renderEntities,
};