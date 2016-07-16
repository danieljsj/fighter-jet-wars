'use strict';

const SnapshotRetrievalService = require('./SnapshotRetrievalService');

const Fighter = require('../../common/services/models/Fighter');
const Blimp = 	require('../../common/services/models/Blimp');



const gD = { //// WAIT... this is looking like a clone not fully converted of GameDataService
	users: [],
	players: [],
	entities: [],
};

// const Laser = require('../../common/services/Laser'); // coming soon
	
const entityConstructors = {
	'fighter': Fighter,
	'blimp': Blimp,
	// 'laser': Laser, // coming soon
};


function importSnapshotThen(cb){
	SnapshotRetrievalService.retrieveThen(function useSnapshotData(snapshotData){

		console.log('snapshotData',snapshotData);

    	for (const uid in snapshotData.players) {
    		const playerData = snapshotData.players[uid];
    		//...
    	}

    	for (const uid in snapshotData.entities) {
    		const entityData = snapshotData.entities[uid];
			const entity = new entityConstructors[entityData.entityTypeName](entityData);
			gD.entities.push(entity);
		}

		cb();
    });
}

module.exports = {
	importSnapshotThen: importSnapshotThen,
	data: gD,
}

	
















  










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

 //    const entities;

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
