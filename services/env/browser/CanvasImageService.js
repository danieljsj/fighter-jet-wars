'use strict';

// TODO: CONVERT ALL THESE TO classES... 

function CanvasImage(params){
	
	// this.ready = false;

	this.url = params.url;
	this.width = params.width;
	this.height = params.height;

	this.domImage = new Image();

	// this.domImage.onload(function(){
	// 	this.ready = true;
	// }.bind(this));

	this.domImage.src = this.url;

}

module.exports = {
	CanvasImage: CanvasImage
};