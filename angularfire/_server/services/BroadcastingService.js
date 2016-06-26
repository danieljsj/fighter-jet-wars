'use strict';

// Trying a broadcasting service that sends them all at once. We'll see if that works. We can test it against sending incremental tiny changes one by one. Basically trying to find optimum request number/size tradeoff.
// Ultimately I'm pretty certain that they're going to want me to do things on a model-by-model basis; but for now, like i said, just going to stick with slapping everything up there all at once.

var FirebaseRefService = require('./FirebaseRefService');
var gD = require('./GameDataService').data;

module.exports = {
	sendUpdate: sendUpdate,
}

function sendUpdate() {

	publishEntitiesData();
	publishPlayersData();

}

function publishEntitiesData() {
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
	FirebaseRefService.getRef().child('entities').set(redactedEntities, function(err){
		if (err) throw err;
	});
}


function publishPlayersData() {
	var redactedPlayers = {};
	gD.players.forEach(function(player){
		redactedPlayers[player.id] = {
			id: player.id,
			userId: (player.user ? player.user.id : false )
		};
	});
	FirebaseRefService.getRef().child('players').set(redactedPlayers, function(err){
		if (err) throw err;
	});
}