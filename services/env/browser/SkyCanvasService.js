'use strict';

const EntityTypesAppearanceService = require('./EntityTypesAppearanceService');

let canvas, ctx, mainSim;

function initCanvas(sim){

	mainSim = sim;

	if (canvas) return;

	// Create the canvas
	canvas = document.createElement('canvas');

	window.onload = fullscreenifyCanvas;
	window.onresize = fullscreenifyCanvas;

	document.body.appendChild(canvas);
	// canvas.style["z-index"] = 1;
	ctx = canvas.getContext("2d");

	sim.afterCaughtUpTick()

}

function renderEntitiesAndRequeue(){
	renderEntities(mainSim.gD.entities);
	sim.afterCaughtUpTick(renderEntitiesAndRequeue);
}

function fillSkyBlue(){
	ctx.beginPath();
	ctx.rect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#eeeeff";
	ctx.fill();
}

function renderEntities(entities){
	// centerPoint = {x: registries.players[0].p.x, y: registries.players[0].p.y + 32,}
	var centerPoint = {x:0,y:0};

	clear();

	// fillSkyBlue();

	entities = entities || GameDataService.data.entities;

	for (const uid in entities){
		const entity = entities[uid];
		draw(entity, centerPoint);
	};

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
	var canvasImage = EntityTypesAppearanceService.getType(entity.entityTypeName).getCanvasImage();
	ctx.translate(-canvasImage.width/2, -canvasImage.height/2); // MAYBE FOLD THIS INTO DRAWIMAGE?? ALSO... A BIT WEIRD THAT THIS IS HAPPENING AFTER THE ROTATE, EH?
	try{
		ctx.drawImage(canvasImage.domImage, 0, 0);
	} catch(err) {
		console.error("IMAGE NOT READY YET");
	}

}

function fullscreenifyCanvas(){
	if (canvas.width != window.innerWidth){
		canvas.width = window.innerWidth || 300;
	}
	if (canvas.height != window.innerHeight){
		canvas.height = window.innerHeight || 400;
	}
}

module.exports = {
	initCanvas: initCanvas,
};