'use strict';

// makes or reads text-only (no refs) literals

const Fighter = require('./models/Fighter.js');
const Blimp = require('./models/Blimp.js');
// const FirebaseRefService = require('./FirebaseRefService'); // later... for when I... wait... no... i don't need this... we're streaming a single pile of commands, so I don't need to apply refs onto the entities themselves...

const tickSnapshots = {};

const entityConstructors = {
	'fighter': Fighter,
	'blimp': Blimp
}

//////////

function Snapshot(gD,currTick){ // gD should probably CONTAIN currTick....
	this.tick = currTick;
	this.players = makeRedactedPlayers(gD.players);
	this.entities = makeRedactedEntities(gD.entities);
	
	// tickSnapshots[currTick] = this; // note: this will eventually clog the poo out of memory if we're not careful!!!!
	
	console.log('made snapshot');
}

//////////////

function makeRedactedPlayers(gDPlayers){
	var redactedPlayers = {};
	for (const id in gDPlayers) {
		const player = gDPlayers[id];
		redactedPlayers[player.id] = {
			id: player.id,
			userId: (player.user ? player.user.id : false )
		};
	};
	return redactedPlayers;
}
function makeRedactedEntities(gDEntities){
	let lolz = 0;
	const redactedEntities = {};
	for (const id in gDEntities) {
		const entity = gDEntities[id];
		const redactedEntity = {
			// different than ob:
			player: 		entity.player.id,
			// same as ob:
			entityTypeName: entity.entityTypeName,
			id: 			entity.id,
			p: 				entity.p,
			controls: 		entity.controls,
		};
		// if (0 == lolz++) console.log(redactedEntity);
		redactedEntities[entity.id] = redactedEntity;
	};
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
		var user = snapshot.users[id]
		user.fbRef = 
		// WARNING!!! THIS MIGHT CREATE A MEMORY LEAK!!!!!!!!
		gD.users[id] = user;
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
	tickSnapshots: tickSnapshots,
}