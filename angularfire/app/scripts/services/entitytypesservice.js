'use strict';

/**
 * @ngdoc service
 * @name angularfireApp.EntityTypesService
 * @description
 * # EntityTypesService
 * Service in the angularfireApp.
 */
angular.module('angularfireApp')
  .service('EntityTypesService', function (CanvasImageService) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
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
		imageUrl: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
    });

    new Type('blimp', {
		width: 182,
		height: 182,
		imageUrl: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
    });

    new Type('laser', {
		width: 32,
		height: 4,
		imageUrl: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
    });

    ///////////////
    
    function getType(typeName) {
    	return typesByName[typeName];
    }

    return {
    	getType: getType,
    }

  });
