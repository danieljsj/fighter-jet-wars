'use strict';

// Trying a broadcasting service that sends them all at once. We'll see if that works. We can test it against sending incremental tiny changes one by one. Basically trying to find optimum request number/size tradeoff.
// Ultimately I'm pretty certain that they're going to want me to do things on a model-by-model basis; but for now, like i said, just going to stick with slapping everything up there all at once.

var SimulationService = require('./SimulationService');

var gD = require('./GameDataService').data;



//////////

function doSnapshotAfterTick(snapshotCb){
	SimulationService.afterTick(function(currTick,dT){
		snapshotCb(new Snapshot(currTick)); 		// TODO: CACHING SO WE DON'T HAVE TO REGEN A TICK FOR EACH PERSON EVER JOINING; WE COULD IN FACT GIVE SNAPSHOTS A TTL OF HOWEVER LONG WE WANT.
	});
}

function Snapshot(currTick){
	this.tick = currTick;
	this.players = getRedactedPlayers();
	this.entities = getRedactedEntities();
}

//////////////


function getRedactedEntities(){
	var redactedEntities = {};
	gD.entities.forEach(function(entity, index){
		var redactedEntity = {
			entityTypeName: entity.entityTypeName,
			p: {
				x: entity.p.x,
				y: entity.p.y,
				direction: entity.p.direction,
				speed: entity.p.speed,
			},
			player: entity.player.id,
		};
		if (0 == index) console.log(redactedEntity);
		redactedEntities[entity.id] = redactedEntity;
	});
	return redactedEntities;
}


function getRedactedPlayers(){
	var redactedPlayers = {};
	gD.players.forEach(function(player){
		redactedPlayers[player.id] = {
			id: player.id,
			userId: (player.user ? player.user.id : false )
		};
	});
	return redactedPlayers;
}



////////

module.exports = {
	doSnapshotAfterTick: doSnapshotAfterTick,
}