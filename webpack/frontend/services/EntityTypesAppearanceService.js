'use strict';

const CanvasImageService = require('./CanvasImageService');


var typesByName = {};

function Type(name, typeData){
	
	this.name = name;

	this.height 	= typeData.height;
	this.width 		= typeData.width;

	this.imageWidth = this.width;
	this.imageHeight= this.height;
	this.imageUrl 	= typeData.imageUrl;
	
	this.canvasImage = new CanvasImageService.CanvasImage({
		height: this.imageHeight,
		width: this.imageWidth,
		url: this.imageUrl,
	});

	// maybe do other stuff to it.
	typesByName[name] = this;
}
Type.prototype.getCanvasImage = function(){
	return this.canvasImage;
};

	///////////////

new Type('fighter', {
	width: 32,
	height: 32,
	imageUrl: "http://10x.agency/games/fighter-jet-wars/images/plane-friendly-gray.png"
});

new Type('blimp', {
	width: 182,
	height: 182,
	imageUrl: "http://10x.agency/games/fighter-jet-wars/images/plane-friendly-gray.png"
});

new Type('laser', {
	width: 32,
	height: 4,
	imageUrl: "http://10x.agency/games/fighter-jet-wars/images/plane-friendly-gray.png"
});

///////////////

function getType(typeName) {
	return typesByName[typeName];
}

module.exports = {
	getType: getType,
}