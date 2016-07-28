'use strict';

// makes or reads text-only (no refs) literals
const ToLog = require('./ToLog');
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

	this.tickStarted = currTick;
	this.tickCompleted = currTick;

	this.users = makeRedactedUsers(gD.users);
	this.players = makeRedactedPlayers(gD.players);
	this.entities = makeRedactedEntities(gD.entities);

	// tickSnapshots[currTick] = this; // note: this will eventually clog the poo out of memory if we're not careful!!!!
	
	if (ToLog.snapshotFull) console.log('this snapshot created',this);

	if (ToLog.snapshot) console.log('made snapshot');
}

Snapshot.prototype.tick = function(){
	if (this.tickStarted === this.tickCompleted){
		return this.tickStarted;
	} else {
		throw new Error('you should not be asking for this during synchronous tick simulation; during tick simulation you should be looking at .tickStarted and .tickCompleted, if anything.');
	}
}

//////////////


function makeRedactedUsers(gDUsers){
	var redactedUsers = {};
	for (const id in gDUsers) {
		const gDUser = gDUsers[id];
		redactedUsers[gDUser.id] = {
			// same as ob:
			id: gDUser.id,
			name: gDUser.name,
			// different than ob:
			// ...
		};
	};
	return redactedUsers;
}
function makeRedactedPlayers(gDPlayers){
	var redactedPlayers = {};
	for (const id in gDPlayers) {
		const gDPlayer = gDPlayers[id];
		redactedPlayers[gDPlayer.id] = {
			// same as ob:
			id: gDPlayer.id,
			// different than ob:
			userId: (gDPlayer.user ? gDPlayer.user.id : false )
		};
	};
	return redactedPlayers;
}
function makeRedactedEntities(gDEntities){
	const redactedEntities = {};
	for (const id in gDEntities) {
		const entity = gDEntities[id];
		const redactedEntity = {
			// same as ob:
			id: 			entity.id,
			entityTypeName: entity.entityTypeName,
			p: 				entity.p,
			controls: 		entity.controls,
			// different than ob:
			playerId: 		entity.player.id,
		};
		redactedEntities[entity.id] = redactedEntity;
	};
	return redactedEntities;
}



/////////////





function makeGameDataFromSnapshot(incomingSnapshot){

	if (ToLog.snapshotFull) console.log('incomingSnapshot',incomingSnapshot);
	
	const gD = {
		users: {},
		players: {},
		entities: {},
	};


	for (const id in incomingSnapshot.users){
		var user = JSON.parse(JSON.stringify( incomingSnapshot.users[id] ));
		// WARNING!!! THIS MIGHT CREATE A MEMORY LEAK!!!!!!!! ... wait... why?
		
		gD.users[id] = user;
	}

	for (const id in incomingSnapshot.players) {
		const player = JSON.parse(JSON.stringify( incomingSnapshot.players[id] ));
		
		player.user = gD.users[player.userId] || null;
		
		gD.players[id] = player;
	}
	for (const id in incomingSnapshot.entities) {
		const entityData = incomingSnapshot.entities[id];
		const entity = new entityConstructors[entityData.entityTypeName](entityData);
		
		entity.player = gD.players[entityData.playerId] || null;
		
		gD.entities[id] = entity;
	}
	for (const id in gD.entities) {
		var entity = gD.entities[id]
		
		entity.parent = gD.entities[entity.parentId] || null;
		
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