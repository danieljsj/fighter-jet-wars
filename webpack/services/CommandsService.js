'use strict';

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
});

// SENDING //////////////////////////////////////////


const entitiesLasts = {}

function send(key,val,eId){

    var entities = GDS.data.entities;

	if (!eId){
	    for (const id in entities){
	      eId = id; // break, so get first.
	      break;
	    }
	}

	const interval = params.minimumRedundantCommandInterval;

	if (!commandsRef) return;

	if (!entitiesLasts[eId]) entitiesLasts[eId] = new ControlsNulls();

  	if ((entitiesLasts[eId][key] !== val) || (entitiesLasts[eId]['timestamp'] < new Date().getTime() - interval)){
    
    entitiesLasts[eId]['timestamp'] = new Date().getTime();

    entitiesLasts[key] = val;

	/////////////////// BLYEORIEUWOIU COME BACK HERE ASKJF DKOJF AODKFJ AND MAKE IT STOP INFINITELY FAST TREAMING REDUNDANT COMMANDS!    

    const cmd = {
      eId: eId,
      key: key,
      val: val,
      bT: (new Date()).getTime(),
      sT: require('firebase').database.ServerValue.TIMESTAMP,
    };



    const cmdRef = commandsRef.push();
    cmdRef.set(cmd, function onComplete(error) {
		if (error) throw("cmd could not be saved." + error);
		// console.log('cmd successfully sent:', cmd);
    	console.log('cmd sent');
	});
    // console.log('sending cmd: ',cmd);
    console.log('sending cmd '+cmdRef.key);

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
				// console.log('received cmd: ',cmd);
	 			console.log('cmd received (#'+numCmdsReceived+')');

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
		TicksCalcService.msToRoundedTicks(cmd.bT),
		// rule: the command happened when you pressed the button, unless that's longer ago than when your command arrived to firebase minus the max allowed lag time, in which case your command registers as being the max amount before arrival to server allowed.
		TicksCalcService.msToRoundedTicks(cmd.sT)-params.maxCommandLagTicks
	);
}

function config(opts){
	commandCallback = opts.commandCallback || function(cmd){};
}





//////////////////////////////////////////


module.exports = {
	config: config,
	startReading: startReading,
	send: send,
}