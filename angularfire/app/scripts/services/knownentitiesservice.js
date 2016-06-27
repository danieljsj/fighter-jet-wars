'use strict';


/**
 * @ngdoc service
 * @name angularfireApp.KnownEntitiesService
 * @description
 * # KnownEntitiesService
 * Service in the angularfireApp.
 */
angular.module('angularfireApp')
  .service('KnownEntitiesService', function(SnapshotRetrievalService) {
    // AngularJS will instantiate a singleton by calling "new" on this class

    const gD = {
		users: [],
		players: [],
		entities: [],
	};

    const Fighter = require('../../../_commonServices/Fighter');
    const Blimp = require('../../../_commonServices/Blimp');
    // const Laser = require('../../../_commonServices/Laser'); // coming soon
  	
	const entityConstructors = {
		'fighter': Fighter,
		'blimp': Blimp,
		// 'laser': Laser, // coming soon
	};


    function importSnapshot(){
    	SnapshotRetrievalService.retrieve(function useSnapshotData(snapshotData){
	    	snapshotData.players.forEach(function createPlayer(playerData){

    		});
	    	snapshotData.entities.forEach(function createEntity(entityData){
				
				var entity = new entityConstructors[entityData.entityTypeName]({
					id: entityData.id,
					playerId: entityData.player,
				});

				gD.entities.push(entity);

			});
	    });
    }

    

	
















  });










// PROBABLY: REDO THIS WITH MORE PERSISTENT ENTITIES, RATHER THAN RE-NEW-ING ALL THE ENTITES EVERY TIME WE GET FRESH DATA!
// 
// 
// 



 //    function Entity(entityData){
 //    	this.typeName = entityData.entityTypeName;
 //    	this.type = EntityTypesAppearanceService.getType(entityData.entityTypeName); // "Name" is redundant since we know we're getting it out of the database. Except I suppose it could have been a type ID.
 //    	this.p = entityData.p;
 //    	this.playerId = entityData.player;
 //    	// console.log(this);
 //    }
 //    Entity.prototype.getCanvasImage = function(){
 //    	return this.type.getCanvasImage(); // currently getting image straight from the type. at some point we may have overrides.
 //    }

 //    ///////

 //    var entities;

	// function pullEntitiesAndRenderThen(cb){

	// 	SnapshotRetrievalService.getSnapshotThen(function(gameSnapshot){

	// 		var entitiesDataById = gameSnapshot.entitiesData;
			
	// 		// COMEBACK!!!!!!!!!!!!!!: Fix this so it actually sends the entities through...

	// 		entities = [];
	// 		for (var id in entitiesDataById ){
	// 			var entity = new Entity(entitiesDataById[id]);
	// 			entities.push(entity);
	// 		}
	  		
	//   		SkyCanvasService.renderEntities(entities);
  			
 //  			if (cb) cb(entities);

	// 	});


	// }

	// /////////
	
	// return {
	// 	pullEntitiesAndRenderThen: pullEntitiesAndRenderThen,
	// }
