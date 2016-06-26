'use strict';

/**
 * @ngdoc service
 * @name angularfireApp.SkyCanvasService
 * @description
 * # SkyCanvasService
 * Service in the angularfireApp.
 */
angular.module('angularfireApp')
  .service('SkyCanvasService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function




 	var canvas, ctx;

    function initCanvas(canvasId){

		// Create the canvas
		canvas = document.getElementById(canvasId);
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

		entities.forEach(function(entity){
			draw(entity, centerPoint);
		});

    }

    function draw(entity, centerPoint){
	
		var e = entity;



		// based on P
		ctx.translate(+1*e.p.x - centerPoint.x + window.innerWidth / 2, +1*e.p.y - centerPoint.y + window.innerHeight / 2)
		ctx.rotate(+1*e.p.direction);

		// based on Img
		var canvasImage = e.getCanvasImage();
		ctx.translate(-canvasImage.width/2, -canvasImage.height/2); // MAYBE FOLD THIS INTO DRAWIMAGE?? ALSO... A BIT WEIRD THAT THIS IS HAPPENING AFTER THE ROTATE, EH?
		ctx.drawImage(canvasImage.domImage, 0, 0);

		// based on nothing
		ctx.setTransform(1,0,0,1,0,0); // (scaleX, skewX, skewY, scaleY, translateX, translateY);


    }


	return {
		initCanvas: initCanvas,
		renderEntities: renderEntities,
	};

  });
