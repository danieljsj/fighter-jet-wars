'use strict';

/**
 * @ngdoc service
 * @name angularfireApp.KnownEntitiesService
 * @description
 * # KnownEntitiesService
 * Service in the angularfireApp.
 */
angular.module('angularfireApp')
  .service('KnownEntitiesService', function (SnapshotRetrievalService, SkyCanvasService, EntityTypesAppearanceService) {
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

	function pullEntitiesAndRenderThen(cb){


		SnapshotRetrievalService.getSnapshotThen(function(gameSnapshot){

			var entitiesDataById = gameSnapshot.entities;
			
			entities = [];
			for (var id in entitiesDataById ){
				var entity = new Entity(entitiesDataById[id]);
				entities.push(entity);
			}
	  		
	  		SkyCanvasService.renderEntities(entities);
  			
  			if (cb) cb(entities);

		});


	}

	/////////
	
	return {
		pullEntitiesAndRenderThen: pullEntitiesAndRenderThen,
	}

  });

// PROBABLY: REDO THIS WITH MORE PERSISTENT ENTITIES, RATHER THAN RE-NEW-ING ALL THE ENTITES EVERY TIME WE GET FRESH DATA!