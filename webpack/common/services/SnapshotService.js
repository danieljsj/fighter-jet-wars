'use strict';

// makes or reads text-only (no refs) literals


const Fighter = require('../../common/services/models/Fighter');
const Blimp = 	require('../../common/services/models/Blimp');

const entityConstructors = {
	'fighter': Fighter,
	'blimp': Blimp
}

//////////

function Snapshot(gD,currTick){ // gD should probably CONTAIN currTick....
	// console.log(gD);
	this.tick = currTick;
	this.players = makeRedactedPlayers(gD.players);
	this.entities = makeRedactedEntities(gD.entities);
}

//////////////

function makeRedactedPlayers(gDPlayers){
	var redactedPlayers = {};
	gDPlayers.forEach(function(player){
		redactedPlayers[player.id] = {
			id: player.id,
			userId: (player.user ? player.user.id : false )
		};
	});
	return redactedPlayers;
}

function makeRedactedEntities(gDEntities){
	var redactedEntities = {};
	gDEntities.forEach(function(entity, index){
		console.log(entity, index);
		var redactedEntity = {
			// different than ob:
			player: 		entity.player.id,
			// same as ob:
			entityTypeName: entity.entityTypeName,
			id: 			entity.id,
			p: 				entity.p,
			controls: 		entity.controls,
		};
		if (0 == index) console.log(redactedEntity);
		redactedEntities[entity.id] = redactedEntity;
	});
	return redactedEntities;
}



/////////////



function makeGameDataFromSnapshot(snapshot){

	const gD = {
		users: {},
		players: {},
		entities: {},
	};

	for (const id in snapshot.users){
		gD.users[id] = snapshot.users[id];
	}

	for (const id in snapshot.players) {
		const player = snapshot.players[id]
		player.user = gD.users[player.user] || player.user;
		gD.players[id] = player;
	}
	for (const id in snapshot.entities) {
		const entityData = snapshot.entities[id];
		const entity = new entityConstructors[entityData.entityTypeName](entityData);
		entity.player = gD.players[entity.player] || entity.player;
		gD.entities[id] = entity;
	}
	for (const id in gD.entities) {
		var entity = gD.entities[id]
		entity.parent = gD.entities[entity.parent] || entity.parent;
		for (const childUid in entity.children){
			entity.children[childUid] = gD.entities[childUid] || entity.children[childUid]; // OPTION: switch to childIds and Children... but I kind of like hanging onto the strings
		}
	}

	return gD;
}




////////

module.exports = {
	Snapshot: Snapshot,
	makeGameDataFromSnapshot: makeGameDataFromSnapshot,
}