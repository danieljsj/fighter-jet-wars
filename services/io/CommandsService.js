'use strict';
const ToLog = require('../ToLog');

const FirebaseRefService = require('../FirebaseRefService');

const params = require('../GameParamsService').params;
const TicksCalcService = require('../TicksCalcService');
const ControlsNulls = require('../models/components/nulls/controls');

const getOffset = require('../FirebaseOffsetService').getOffset;

////////////////////////////////////////////////////

let commandsRef;

FirebaseRefService.initThen(function(){
	commandsRef = FirebaseRefService.ref.child('commands');
	deleteOldCommands();
});

// SENDING //////////////////////////////////////////



const entitiesLasts = {};
const interval = params.minimumRedundantCommandInterval;
if (ToLog.time) console.log(interval);
function send(key,val,eId){
	if (!commandsRef) return;

    // DEBUG; USE FIRST ENTITY IN LIST IF NO ENTITY ID IS SUPPLIED
	if (!eId){
	    throw('NO ENTITY ID WAS SPECIFIED FOR THE COMMAND!');
	}

	if ( !entitiesLasts[eId] ) entitiesLasts[eId] = new ControlsNulls();

  	if ( (entitiesLasts[eId][key] !== val) || ( entitiesLasts[eId]['timestamp'] < new Date().getTime() - interval )){
    
	    entitiesLasts[eId]['timestamp'] = new Date().getTime();

	    entitiesLasts[eId][key] = val;

	    const cmd = {
	      eId: eId,
	      key: key,
	      val: val,
	      cT: (new Date()).getTime() + getOffset(),                   //////////NOTE: this will be wrong by the value of your ping. why. because you think your thing is getting to the server instantly. however, that's not so scary, as generally, the clientTime will be used, so we won't have to re-sim anything from this.  but we WILL get a verification, on child_changed: http://stackoverflow.com/questions/34196263/firebase-servervalue-timestamp-not-synched-between-listeners-and-the-client-that/34205892#34205892 ... only if your cmd got there REALLY slowly will you need to re-sim, and at that point maybe you shouldn't be playing :P :)
	      sT: require('firebase').database.ServerValue.TIMESTAMP,
	    };

	    const cmdRef = commandsRef.push();
	    cmdRef.set(cmd, function onComplete(err) {
			if (err)throw("cmd could not be saved." + err);
			if (ToLog.commandSuccess) console.log('cmd successfully sent:', cmd);
		});
	    if (ToLog.command || ToLog.commandTimes ) console.log('sending cmd '+cmdRef.key);

  	}

}

// READING //////////////////////////////////////////

const _commandAddedCallbacks = []; // a chill version of registering into, say, a dispatcher.
const _commandChangedCallbacks = [];


let numCmdsReceived = 0;
function startReading(){

	FirebaseRefService.initThen(function(){
		commandsRef = FirebaseRefService.ref.child('commands');

		commandsRef.limitToLast(1).on('child_added', function intakeAddedCommandSS(ss){
 			if (++numCmdsReceived > 1){
				const cmd = new Command(ss.val());
				_commandAddedCallbacks.forEach(function(commandCallback){
					commandCallback(cmd);
				});
 			}
		});
		commandsRef.on('child_changed', function intakeChangedCommandSS(ss){ // I believe that this is only fired in the client that created the object with a placeholder timestamp. it's what the browser does when it actually gets the server data; for everybody else this incoming data is treated as child_added
			const cmd = new Command(ss.val());
			cmd.isLocalChange = true;
			_commandChangedCallbacks.forEach(function(commandCallback){
				commandCallback(cmd);
			});
		});

	});

}

function Command(cmdData){

	const cmd = cmdData;

	cmd.tick = Math.max(
		TicksCalcService.msToRoundedTicks(cmd.cT),
		// rule: the command happened when you pressed the button, unless that's longer ago than when your command arrived to firebase minus the max allowed lag time, in which case your command registers as being the max amount before arrival to server allowed.
		TicksCalcService.msToRoundedTicks(cmd.sT)-params.maxCommandLagTicks
	);

	if (ToLog.command) console.log('cmd received (#'+numCmdsReceived+')');
	if (ToLog.commandTimes) console.log('cmd received (#'+numCmdsReceived+'); cT-sT:'+(cmd.cT-cmd.sT));

	return cmd;

};
Command.prototype.isLocal = function(){
	return (this.sT-this.bT) < _minimumReasonableRemoteLatency; 
};
Command.prototype.setFormerTick = function(localFormerTick){
	cmd.formerTick = formerTick;
};
Command.prototype.getFormerTick = function(){
	return cmd.formerTick;
};


function deleteOldCommands(){
	commandsRef.remove();
}



function addCommandAddedCallback(fn){
	_commandAddedCallbacks.push(fn);
}
function removeCommandAddedCallback(fn){
	delete _commandAddedCallbacks[_commandAddedCallbacks.indexOf(fn)];
}
function addCommandChangedCallback(fn){
	_commandChangedCallbacks.push(fn);
}
function removeCommandChangedCallback(fn){
	delete _commandChangedCallbacks[_commandChangedCallbacks.indexOf(fn)];
}


//////////////////////////////////////////


module.exports = {

	send: send,

	startReading: startReading,

	addCommandAddedCallback: addCommandAddedCallback,
	removeCommandAddedCallback: removeCommandAddedCallback,

	addCommandChangedCallback: addCommandChangedCallback,
	removeCommandChangedCallback: removeCommandChangedCallback,
}