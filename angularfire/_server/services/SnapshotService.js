'use strict';

// Trying a broadcasting service that sends them all at once. We'll see if that works. We can test it against sending incremental tiny changes one by one. Basically trying to find optimum request number/size tradeoff.
// Ultimately I'm pretty certain that they're going to want me to do things on a model-by-model basis; but for now, like i said, just going to stick with slapping everything up there all at once.

var SimulationService = require('./SimulationService');

var gD = require('./GameDataService').data;

module.exports = {
	doSnapshotAfterTick: doSnapshotAfterTick,
}


function Snapshot(){
	this.time = (new Date()).getTime(); // switch to a tick service
	this.players = getRedactedPlayers();
	this.entities = getRedactedEntities();
}





function doSnapshotAfterTick(snapshotCb){
	SimulationService.afterTick(function(){
		snapshotCb(new Snapshot()); 		// TODO: CACHING SO WE DON'T HAVE TO REGEN A TICK FOR EACH PERSON EVER JOINING; WE COULD IN FACT GIVE SNAPSHOTS A TTL OF HOWEVER LONG WE WANT.
	});
}

//////////////


function getRedactedEntities(){
	var redactedEntities = {};
	gD.entities.forEach(function(entity, index){
		var redactedEntity = {
			entityTypeName: entity.entityTypeName,
			p: {
				x: Math.round(entity.p.x),
				y: Math.round(entity.p.y),
				direction: Math.round(entity.p.direction * 100) / 100,
			},
			// player: entity.player.id,
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