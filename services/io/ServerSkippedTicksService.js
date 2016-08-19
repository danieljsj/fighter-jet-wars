'use strict';

// this file will represent a really simple io reader service. it's a wrapper around firebase for this. it's like serverSkippedTick service, only lots simpler cuz we're not doing stuff to figure out what tick it happened on, etc.

const FirebaseRefService = require('../FirebaseRefService');


let serverSkippedTicksRef;


// READING //////////////////////////////////////////

const _serverSkippedTickAddedCallbacks = []; // a chill version of registering into, say, a dispatcher.

let numSstsReceived = 0;
function startReading(){

	FirebaseRefService.initThen(function(){
		serverSkippedTicksRef = FirebaseRefService.ref.child('serverSkippedTicks');

		serverSkippedTicksRef.limitToLast(1).on('child_added', function intakeAddedServerSkippedTickSS(ss){
 			if (++numSstsReceived > 1){

				const sst = new ServerSkippedTick(ss.val());

				_serverSkippedTicksAddedCallbacks.forEach(function(serverSkippedTickCallback){
					serverSkippedTickCallback(sst);
				});
 			}
		});
	});
}

function ServerSkippedTick(sstData){

	// doesn't modify it at

	const sst = sstData;

	if (ToLog.serverSkippedTick) console.log('sst received (#'+numSstsReceived+')');
	if (ToLog.serverSkippedTickTimes) console.log('sst received (#'+numSstsReceived+'); cT-sT:'+(sst.cT-sst.sT));

	return sst;

};

function addServerSkippedTickAddedCallback(cb){
	_serverSkippedTickAddedCallbacks.push(cb);
}

////////// SENDING


function send(tick){
	if (!serverSkippedTicksRef) return;

    // DEBUG; USE FIRST ENTITY IN LIST IF NO ENTITY ID IS SUPPLIED
	if (!tick){
	    throw('NO tick WAS SPECIFIED FOR THE SERVER SKIPPED TICK!');
	}

    const sst = {
      tick: tick,
    };

	    const sstRef = serverSkippedTicksRef.push();
	    sstRef.set(sst, function onComplete(err) {
			if (err)throw("sst could not be saved." + err);
			if (ToLog.serverSkippedTickSuccess) console.log('sst successfully sent:', sst);
		});
	    if (ToLog.serverSkippedTick || ToLog.serverSkippedTickTimes ) console.log('sending sst '+sstRef.key);

  	}

}



///////////// Service:


module.exports = {

	send: send,

	startReading: startReading,

	addServerSkippedTickAddedCallback: addServerSkippedTickAddedCallback,

};