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

const _playerRelocationCallbacks = []; // a chill version of registering into, say, a dispatcher.
function addPlayerRelocationCallback(cb){
	_playerRelocationCallbacks.push(cb);
}

////////// SENDING


function send(playerMovement){
	if (!playerMovementsRef) return;

	if (!playerMovement){
	    throw('NO playerMovement WAS SPECIFIED!');
	}

    const playerMovementRef = playerMovementsRef.push();
    playerMovementRef.set(playerMovement, function onComplete(err) {
		if (err)throw("playerMovement could not be saved." + err);
		if (ToLog.playerMovement) console.log('playerMovement successfully sent:', playerMovement);
	});
    if (ToLog.playerMovement || ToLog.playerMovementTimes ) console.log('sending playerMovement '+playerMovementRef.key);

}



///////////// Service:


module.exports = {

	send: send,

	startReading: startReading,

	addPlayerMovementAddedCallback: addPlayerMovementAddedCallback,

};