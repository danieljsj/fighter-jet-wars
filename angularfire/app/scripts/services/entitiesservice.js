'use strict';

/**
 * @ngdoc service
 * @name angularfireApp.EntitiesService
 * @description
 * # EntitiesService
 * Service in the angularfireApp.
 */
angular.module('angularfireApp')
  .service('EntitiesService', function (Ref, SkyCanvasService, EntityTypesAppearanceService, $timeout, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    


    function Entity(entityData){
    	this.typeName = entityData.entityTypeName;
    	this.type = EntityTypesAppearanceService.getType(entityData.entityTypeName); // "Name" is redundant since we know we're getting it out of the database. Except I suppose it could have been a type ID.
    	this.p = entityData.p;
    	this.playerId = entityData.player;
    	// console.log(this);
    }
    Entity.prototype.getCanvasImage = function(){
    	return this.type.getCanvasImage(); // currently getting image straight from the type. at some point we may have overrides.
    }

    ///////

    var entities;

    var entitiesRef = Ref.child('entities');

	function listenRenderingThen(cb){

		entitiesRef.on('value', function(ss){

			var entitiesDataById = ss.val();
			entities = [];
			for (var id in entitiesDataById ){
				var entity = new Entity(entitiesDataById[id]);
				entities.push(entity);
			}
	  		
	  		SkyCanvasService.renderEntities(entities);
	  		



		// WHOAH - this is for the map!
		// this.marker.setLatLng(this.getLatLng());
		// var newAngle = (360/(2*3.14)) * this.p.direction;
		// this.marker.setRotationAngle( newAngle );



	  		cb(entities);

	  		$timeout(function(){$rootScope.$apply()});
		});
	}

	/////////
	
	return {
		listenRenderingThen: listenRenderingThen,
	}

  });

// PROBABLY: REDO THIS WITH MORE PERSISTENT ENTITIES, RATHER THAN RE-NEW-ING ALL THE ENTITES EVERY TIME WE GET FRESH DATA!