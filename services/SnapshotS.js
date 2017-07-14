'use strict';
// makes or reads text-only (no refs) literals

// should this go in IO? since it is streamed...? but it's not only streamed... so maybe not.

const GD = require('./models/components/empties/GD');
const ToLog = require('./ToLog');

const Fighter = require('./models/Fighter.js');
const Blimp = require('./models/Blimp.js');

const entityConstructors = {
	'fighter': Fighter,
	'blimp': Blimp
}





////////////// PACKING:


function Snapshot(gD){ // gD should probably CONTAIN currTick....

	if (ToLog.snapshotsAllFull) console.log('incoming gD for snapshot',gD);

	// 2017-01-16: gD.users == {}!

	this.tickStarted = gD.tick();
	this.tickCompleted = gD.tick();

	this.users = makeRedactedUsers(gD.users);
	this.players = makeRedactedPlayers(gD.players);
	this.entities = makeRedactedEntities(gD.entities);
	
	if (ToLog.snapshotsAllFull) console.log('this snapshot created',this);

	if (ToLog.snapshot) console.log('made snapshot');
}

Snapshot.prototype.tick = function(){
	if (this.tickStarted === this.tickCompleted){
		return this.tickStarted;
	} else {
		// WAIT A MINUTE... WHY DO WE EVEN HAVE THAT LEVER... SNAPSHOTS SHOULD NOT HAVE TICKSTARTED AND TICKCOMPLETED... OR IF THEY DO, THEY SHOULD ALWAYS BE THE SAME... THIS SEEMS LIKE SOMETHING THAT A GAME DATA WOULD HAVE, NOT A SNAPSHOT...
		console.warn("oops, this.tickStarted",this.tickStarted,"this.tickCompleted",this.tickCompleted, "diff", this.tickStarted-this.tickCompleted);
		throw new Error('you should not be asking for this during synchronous tick simulation; during tick simulation you should be looking at .tickStarted and .tickCompleted, if anything.');
	}
}



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

		if (ToLog.snapshotsAllFull) console.log('entity (for snapshot)',entity);

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



///////////// UNPACKING:



function makeGameDataFromSnapshot(incomingSnapshot){

	if (!incomingSnapshot) {
		console.warn("falsy snapshot cannot be used to make game data... returning a null/falsy-filled one.");
		return new GD();
	}

	if (ToLog.snapshotsAllFull) {
		console.log('incomingSnapshot',incomingSnapshot); 
	}

	const gD = new GD();

	gD.tickStarted = incomingSnapshot.tickStarted;
	gD.tickCompleted = incomingSnapshot.tickCompleted;

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
	if (ToLog.snapshotsAllFull) {
		let i=0;
		for (const eId in gD.entities){
			console.log('ss e'+i++,':');
			console.log(gD.entities[eId].p);
		}
	}
	return gD;
}



function getDifferences(ob1,ob2){
	if (ToLog.ssDiff) console.log("-- ob1 --",ob1,"-- ob2 --",ob2);

	if (!ob2) return ob1; // if there's no ob2, the whole of ob1 is the diff map.

	const diffMap = iterateAndReportDeepDifferences(ob1,ob2);

	if (ToLog.ssDiff) console.log("diffMap: ",diffMap);

	// if (diffMap) debugger;

	return diffMap;
}

function is_scalar(obj){return (/string|number|boolean/).test(typeof obj);}

function iterateAndReportDeepDifferences(ob1,ob2){
	if (ToLog.ssDiff) console.log("iterateAndReportDeepDifferences on")
	if (ToLog.ssDiff) console.log(ob1);
	if (ToLog.ssDiff) console.log(ob2);
	const diffMap = {};
	let hasDiffs = false;
	for (const key in ob1) {
		// if (!ob2) debugger;
		if (ToLog.ssDiff) console.log(
			"comparing"
			,key
			,ob1[key]
			,ob2[key]
		);
		if (ob1[key]===ob2[key]){
			if (ToLog.ssDiff) console.log("items are identical; ignoring them");
		} else {
			if (is_scalar(ob1[key])&&is_scalar(ob2[key])){
				if (ToLog.ssDiff) console.log("diffed are scalar; saving ob2[key] into diffMap[key]: ",ob2[key]); // whoah, this keep
				diffMap[key+"_NEW"] = ob2[key];
				diffMap[key+"_OLD"] = ob1[key];
				hasDiffs = true;
			} else {
				const subDiffMap = iterateAndReportDeepDifferences(ob1[key],ob2[key]); 
				if (subDiffMap){
					hasDiffs = true;
					if (ToLog.ssDiff) console.log("saving diffMap into",key); // whoah, this keep
					diffMap[key] = subDiffMap;
				}
			}
		}
	}
	return hasDiffs && diffMap;
}









////////

module.exports = {
	Snapshot: Snapshot,
	makeGameDataFromSnapshot: makeGameDataFromSnapshot,
	getDifferences: getDifferences,
}