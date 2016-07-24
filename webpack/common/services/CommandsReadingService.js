'use strict';

const FirebaseRefService = require('./FirebaseRefService');
const GDS = require('./GameDataService');
const GameParamsService = require('./GameParamsService');
const TicksCalcService = require('./TicksCalcService');

const knownCommandsByTick = [];


let commandCallback;



function reSimulate(){}; ///////// WHERE AND HOW

function start(){

	FirebaseRefService.initThen(function(){
		const commandsRef = FirebaseRefService.ref.child('commands');
		commandsRef.limitToLast(1).on('child_added', function(commandSnapshot){

			const cmd = commandSnapshot.val();

								console.log('received cmd: ',cmd);

								// temporary:
								var entity = GDS.data.entities[cmd.eId];
								if (entity) entity.controls[cmd.key] = cmd.val;

			cmd.tick = getCommandTick(cmd);

			// up and coming:
			if (commandCallback) {
				commandCallback(cmd); // more wise, involving ticks
			}

		});
	});

}

// setting the .tick in common is good because server and browser should definitely agree! just hopefully the server's rendering is enough behind (and I bet it could gauge itself to prevent excessive backtracking-needing) that the tick of a command the server is receiving is always ahead of what the server is simulating, so no backtracking.


function getCommandTick(cmd){
	return Math.max(
		TicksCalcService.msToRoundedTicks(cmd.bT),
		// rule: the command happened when you pressed the button, unless that's longer ago than when your command arrived to firebase minus the max allowed lag time, in which case your command registers as being the max amount before arrival to server allowed.
		TicksCalcService.msToRoundedTicks(cmd.sT)-GameParamsService.params.maxCommandLagTicks
	);
}

function config(opts){
	commandCallback = opts.commandCallback || function(cmd){};
}

module.exports = {
	config: config,
	start: start,
}