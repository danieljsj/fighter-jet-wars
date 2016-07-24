'use strict';

const FirebaseRefService = require('./FirebaseRefService');
const GDS = require('./GameDataService');
const GameParamsService = require('./GameParamsService');
const TicksCalcService = require('./TicksCalcService');

const knownCommandsByTick = [];

let latestKnownValidTick = 9999999999999999999; ///////WHERE AND HOW ARE WE GOING TO STORE THIS?

let commandCallback;



function reSimulate(){}; ///////// WHERE AND HOW

let maxLagTicksAllowed = TicksCalcService.msToRoundedTicks(100);

function start(){

	FirebaseRefService.initThen(function(){
		const commandsRef = FirebaseRefService.ref.child('commands');
		commandsRef.limitToLast(1).on('child_added', function(commandSnapshot){

			const cmd = commandSnapshot.val();

			console.log('received cmd: ',cmd);

			// temporary:
			var entity = GDS.data.entities[cmd.eId];
			if (entity) entity.controls[cmd.key] = cmd.val;

			// up and coming:
			intakeCommand(cmd); // more wise, involving ticks

		});
	});

}

// setting the .tick in common is good because server and browser should definitely agree! just hopefully the server's rendering is enough behind (and I bet it could gauge itself to prevent excessive backtracking-needing) that the tick of a command the server is receiving is always ahead of what the server is simulating, so no backtracking.
function intakeCommand(cmd){

	cmd.tick = getCommandTick(cmd);

	if (!knownCommandsByTick[cmd.tick]) knownCommandsByTick[cmd.tick] = [];

	knownCommandsByTick[cmd.tick].push(cmd);
	if (latestKnownValidTick > cmd.tick) {
		latestKnownValidTick = cmd.tick - 1;
		reSimulate(latestKnownValidTick);
	}
}

function getCommandTick(cmd){
	return Math.max(
		TicksCalcService.msToRoundedTicks(cmd.bT),
		// rule: the thing happened when you pressed the button, unless that's longer ago than when your command arrived to the server minus the max allowed lag time
		TicksCalcService.msToRoundedTicks(cmd.sT)-maxLagTicksAllowed
	);
}

function setCommandCallback(fn){
	commandCallback = fn;
}
function setReSimulateFn(fn){
	reSimulate = fn;
}

module.exports = {
	start: start,
	setCommandCallback: setCommandCallback,
	setReSimulateFn: setReSimulateFn,
	knownCommandsByTick: knownCommandsByTick,
}