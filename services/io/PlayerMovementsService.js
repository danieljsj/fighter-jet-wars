'use strict';

// this file will represent a really simple io reader service. it's a wrapper around firebase for this. it's like serverSkippedTick service, only lots simpler cuz we're not doing stuff to figure out what tick it happened on, etc.

const FirebaseRefService = require('../FirebaseRefService');


let playerMovementsRef;


// READING //////////////////////////////////////////


let numSstsReceived = 0;
function startReading(){

	FirebaseRefService.initThen(function(){
		playerMovementsRef = FirebaseRefService.ref.child('playerMovements');

		playerMovementsRef.limitToLast(1).on('child_added', function intakePlayerMovementSS(ss){
 			if (++numSstsReceived > 1){

				const sst = new PlayerMovement(ss.val());

				_playerMovementsAddedCallbacks.forEach(function(playerMovementCallback){
					playerMovementCallback(sst);
				});
 			}
		});
	});
}

function PlayerMovement(movementData){

	// doesn't modify it at

	const sst = movementData;

	if (ToLog.serverSkippedTick) console.log('sst received (#'+numSstsReceived+')');
	if (ToLog.serverSkippedTickTimes) console.log('sst received (#'+numSstsReceived+'); cT-sT:'+(sst.cT-sst.sT));

	return sst;

};




const _playerExitCallbacks = []; // a chill version of registering into, say, a dispatcher.
function addPlayerExitCallback(cb){
	_playerExitCallbacks.push(cb);
}

const _playerEntranceCallbacks = []; // a chill version of registering into, say, a dispatcher.
function addPlayerEntranceCallback(cb){
	_playerEntranceCallbacks.push(cb);
}

////////// SENDING


function send(tick){
	if (!playerMovementsRef) return;

    // DEBUG; USE FIRST ENTITY IN LIST IF NO ENTITY ID IS SUPPLIED
	if (!tick){
	    throw('NO tick WAS SPECIFIED FOR THE SERVER SKIPPED TICK!');
	}

    const sst = {
      tick: tick,
    };

    const sstRef = playerMovementsRef.push();
    sstRef.set(sst, function onComplete(err) {
		if (err)throw("sst could not be saved." + err);
		if (ToLog.serverSkippedTickSuccess) console.log('sst successfully sent:', sst);
	});
    if (ToLog.serverSkippedTick || ToLog.serverSkippedTickTimes ) console.log('sending sst '+sstRef.key);

}



///////////// Service:


module.exports = {

	send: send,

	startReading: startReading,

	addPlayerMovementAddedCallback: addPlayerMovementAddedCallback,

};