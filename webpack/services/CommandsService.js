'use strict';
const ToLog = require('./ToLog');

const FirebaseRefService = require('./FirebaseRefService');
const GDS = require('./GameDataService');
const params = require('./GameParamsService').params;
const TicksCalcService = require('./TicksCalcService');
const ControlsNulls = require('./models/components/nulls/controls');

const knownCommandsByTick = {};

////////////////////////////////////////////////////

let commandsRef;

FirebaseRefService.initThen(function(){
	commandsRef = FirebaseRefService.ref.child('commands');
	deleteOldCommands();
});

// SENDING //////////////////////////////////////////


const entitiesLasts = {}
const interval = params.minimumRedundantCommandInterval;
console.log(interval);
function send(key,val,eId){
	if (!commandsRef) return;

    var entities = GDS.data.entities;

    // DEBUG; USE FIRST ENTITY IN LIST IF NO ENTITY ID IS SUPPLIED
	if (!eId){
	    throw('NO ENTITY ID WAS SPECIFIED FOR THE COMMAND!');
	}

	if ( !entitiesLasts[eId] ) entitiesLasts[eId] = new ControlsNulls();

  	if ( (entitiesLasts[eId][key] !== val) || ( entitiesLasts[eId]['timestamp'] < new Date().getTime() - interval )){
    
    	console.log(entitiesLasts[eId]['timestamp']);

	    entitiesLasts[eId]['timestamp'] = new Date().getTime();

	    entitiesLasts[eId][key] = val;

	    const cmd = {
	      eId: eId,
	      key: key,
	      val: val,
	      cT: (new Date()).getTime(), // CLOCK
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

let commandCallback;

let numCmdsReceived = 0;
function startReading(){

	FirebaseRefService.initThen(function(){
		commandsRef = FirebaseRefService.ref.child('commands');
		commandsRef.limitToLast(1).on('child_added', function(commandSnapshot){
 
 			if (++numCmdsReceived > 1){

				const cmd = commandSnapshot.val();
	 			if (ToLog.command) console.log('cmd received (#'+numCmdsReceived+')');
	 			if (ToLog.commandTimes) console.log('cmd received (#'+numCmdsReceived+'); cT-sT:'+(cmd.cT-cmd.sT));

	 			const entities = GDS.data.entities;


				// temporary, non-queued:
				if (entities){
					var entity = entities[cmd.eId];
					if (entity) entity.controls[cmd.key] = cmd.val;
				}
				// endTemporary



				cmd.tick = getCommandTick(cmd);

				// up and coming:
				if (commandCallback) {
					commandCallback(cmd); // more wise, involving ticks
				}
 			}

		});
	});

}

// setting the .tick in common is good because server and browser should definitely agree! just hopefully the server's rendering is enough behind (and I bet it could gauge itself to prevent excessive backtracking-needing) that the tick of a command the server is receiving is always ahead of what the server is simulating, so no backtracking.


function getCommandTick(cmd){
	return Math.max(
		TicksCalcService.msToRoundedTicks(cmd.cT),
		// rule: the command happened when you pressed the button, unless that's longer ago than when your command arrived to firebase minus the max allowed lag time, in which case your command registers as being the max amount before arrival to server allowed.
		TicksCalcService.msToRoundedTicks(cmd.sT)-params.maxCommandLagTicks
	);
}

function config(opts){
	commandCallback = opts.commandCallback || function(cmd){};
}



function deleteOldCommands(){
	commandsRef.remove();
}






//////////////////////////////////////////


module.exports = {
	config: config,
	startReading: startReading,
	send: send,
}