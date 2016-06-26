'use strict';

/**
 * @ngdoc service
 * @name angularfireApp.CanvasImageService
 * @description
 * # CanvasImageService
 * Service in the angularfireApp.
 */
angular.module('angularfireApp')
  .service('CanvasImageService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    function CanvasImage(params){
		
		// this.ready = false;

		this.url = params.url;
		this.width = params.width;
		this.height = params.height;

		this.domImage = new Image();
		console.log(this.domImage);
		// this.domImage.onload(function(){
		// 	this.ready = true;
		// }.bind(this));

		this.domImage.src = this.url;

    }

    return {
    	CanvasImage: CanvasImage
    };

  });
