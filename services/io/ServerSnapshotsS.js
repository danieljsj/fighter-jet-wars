'use strict';

const FirebaseRefS = require('../FirebaseRefS');
const ToLog = require('../ToLog');
const Snapshot = require('../SnapshotS').Snapshot;

// this file will represent a really simple io reader service. it's a wrapper around firebase for this. it's like serverSkippedTick service, only lots simpler cuz we're not doing stuff to figure out what tick it happened on, etc.

let latestServerSnapshotRef;


// READING //////////////////////////////////////////

const _ServerSnapshotCbs = []; // a chill version of registering into, say, a dispatcher.

let numServerSnapshotsReceived = 0;

function startReading(){

	FirebaseRefS.initThen(function(){
		latestServerSnapshotRef = FirebaseRefS.ref.child('latestServerSnapshot');

		latestServerSnapshotRef.on('value', function intakeServerSnapshotSS(ss){
 			if (++numServerSnapshotsReceived > -Infinity){

 				if(ss.val()) {	
					const serverSnapshot = new ServerSnapshot(ss.val());
					_ServerSnapshotCbs.forEach(function(cb){
						cb(serverSnapshot);
					});
 				} else {
 					console.warn('WELL, IT LOOKS LIKE THERE IS NO SERVER SNAPSHOT VALUE...');
 				}

 			}
		});
	});
}

function ServerSnapshot(serverSnapshotData){

	if (ToLog.serverSnapshot) console.log('serverSnapshot received (#'+numServerSnapshotsReceived+')');

	for(var k in serverSnapshotData) {
		this[k]=serverSnapshotData[k];
	}

};


ServerSnapshot.prototype.tick = function(){
	if (this.tickStarted === this.tickCompleted){
		return this.tickStarted;
	} else {
		// WAIT A MINUTE... WHY DO WE EVEN HAVE THAT LEVER... SNAPSHOTS SHOULD NOT HAVE TICKSTARTED AND TICKCOMPLETED... OR IF THEY DO, THEY SHOULD ALWAYS BE THE SAME... THIS SEEMS LIKE SOMETHING THAT A GAME DATA WOULD HAVE, NOT A SNAPSHOT...
		if (false) throw new Error('you should not be asking for this during synchronous tick simulation; during tick simulation you should be looking at .tickStarted and .tickCompleted, if anything.');

		return this.tickStarted || this.tickCompleted;
	}
}


function addServerSnapshotCb(cb){
	_ServerSnapshotCbs.push(cb);
}

////////// SENDING


function send(gD){
	if (!latestServerSnapshotRef) return;

    // DEBUG; USE FIRST ENTITY IN LIST IF NO ENTITY ID IS SUPPLIED
	if (!gD) {
	    throw('NO gD WAS SPECIFIED');
	}

    const snapshot = new Snapshot(gD);

    latestServerSnapshotRef.set(snapshot, function onComplete(err) {
		if (err)throw("snapshot could not be saved." + err);
		if (ToLog.serverSnapshotSuccess) console.log('snapshot successfully sent:', snapshot);
	});
    if (ToLog.serverSnapshot || ToLog.serverSnapshotTimes ) console.log('sending snapshot '+latestServerSnapshotRef.key);

}


///////////// S:


module.exports = {

	send: send,

	startReading: startReading,

	addServerSnapshotCb: addServerSnapshotCb,

};