'use strict';

// Trying a broadcasting service that sends them all at once. We'll see if that works. We can test it against sending incremental tiny changes one by one. Basically trying to find optimum request number/size tradeoff.
// Ultimately I'm pretty certain that they're going to want me to do things on a model-by-model basis; but for now, like i said, just going to stick with slapping everything up there all at once.

var FirebaseRefService = require('./FirebaseRefService');
var gD = require('./GameDataService').data;

module.exports = {
	sendUpdate: sendUpdate,
}

function sendUpdate() {

	// console.log("JK not sending update; disabled."); return;

	publishEntitiesData();
	publishPlayersData();

}

function publishEntitiesData() {
	var redactedEntities = {};
	gD.entities.forEach(function(entity){
		redactedEntities[entity.id] = {
			entityTypeName: entity.entityTypeName,
			p: entity.p,
			player: entity.player.id,
		};
	});
	// console.log('redactedEntities:', redactedEntities);
	FirebaseRefService.getRef().child('entities').set(redactedEntities, function(err){
		if (err) throw err;
		console.log('set/sent redactedEntities');
	});
}


function publishPlayersData() {
	var redactedPlayers = {};
	gD.players.forEach(function(player){
		console.log(player);
		redactedPlayers[player.id] = {
			id: player.id,
			userId: (player.user ? player.user.id : false )
		};
	});
	// console.log('redactedPlayers:', redactedPlayers);
	FirebaseRefService.getRef().child('players').set(redactedPlayers, function(err){
		if (err) throw err;
		console.log('set/sent redactedPlayers');
	});
}