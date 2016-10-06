'use strict';

const FirebaseRefService = require('../FirebaseRefService');
const ToLog = require('../ToLog');

// this file will represent a really simple io reader service. it's a wrapper around firebase for this. it's like serverSkippedTick service, only lots simpler cuz we're not doing stuff to figure out what tick it happened on, etc.

let latestServerSnapshotRef;


// READING //////////////////////////////////////////

const _ServerSnapshotCallbacks = []; // a chill version of registering into, say, a dispatcher.

let numServerSnapshotsReceived = 0;

function startReading(){

	FirebaseRefService.initThen(function(){
		latestServerSnapshotRef = FirebaseRefService.ref.child('latestServerSnapshot');

		latestServerSnapshotRef.limitToLast(1).on('value', function intakeServerSnapshotSS(ss){
 			if (++numServerSnapshotsReceived > -Infinity){

				const serverSnapshot = new ServerSnapshot(ss.val());

				_ServerSnapshotCallbacks.forEach(function(cb){
					cb(serverSnapshot);
				});
 			}
		});
	});
}

function ServerSnapshot(serverSnapshotData){

	// doesn't modify it at

	const serverSnapshot = serverSnapshotData;

	if (ToLog.serverSnapshot) console.log('serverSnapshot received (#'+numServerSnapshotsReceived+')');
	if (ToLog.serverSnapshotTimes) console.log('serverSnapshot received (#'+numServerSnapshotsReceived+'); cT-sT:'+(serverSnapshot.cT-serverSnapshot.sT));

	return serverSnapshot;

};


ServerSnapshot.prototype.tick = function(){
	throw "I REALLY WANT TO KNOW WHERE ANY WHY WE ARE ASKING FOR THE TICK FROM A SNAPSHOT...";
	if (this.tickStarted === this.tickCompleted){
		return this.tickStarted;
	} else {
		// WAIT A MINUTE... WHY DO WE EVEN HAVE THAT LEVER... SNAPSHOTS SHOULD NOT HAVE TICKSTARTED AND TICKCOMPLETED... OR IF THEY DO, THEY SHOULD ALWAYS BE THE SAME... THIS SEEMS LIKE SOMETHING THAT A GAME DATA WOULD HAVE, NOT A SNAPSHOT...
		throw new Error('you should not be asking for this during synchronous tick simulation; during tick simulation you should be looking at .tickStarted and .tickCompleted, if anything.');
	}
}


function addServerSnapshotCallback(cb){
	_ServerSnapshotCallbacks.push(cb);
}

////////// SENDING


function send(gD,currTick){
	if (!latestServerSnapshotRef) return;

    // DEBUG; USE FIRST ENTITY IN LIST IF NO ENTITY ID IS SUPPLIED
	if (!tick) {
	    throw('NO tick WAS SPECIFIED FOR THE SERVER SKIPPED TICK!');
	}

    const snapshot = new Snapshot(gD,currTick);

    latestServerSnapshotRef.set(snapshot, function onComplete(err) {
		if (err)throw("snapshot could not be saved." + err);
		if (ToLog.serverSnapshotSuccess) console.log('snapshot successfully sent:', sst);
	});
    if (ToLog.serverSnapshot || ToLog.serverSnapshotTimes ) console.log('sending sst '+sstRef.key);

}


///////////// Service:


module.exports = {

	send: send,

	startReading: startReading,

	addServerSnapshotCallback: addServerSnapshotCallback,

};