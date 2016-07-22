const FirebaseRefService = require('./FirebaseRefService');
const GameDataService = require('./GameDataService');
const GameParamsService = require('./GameParamsService');

const knownCommandsByTick = [];

let latestKnownValidTick = 9999999999999999999; ///////WHERE AND HOW ARE WE GOING TO STORE THIS?

function reRender(){}; ///////// WHERE AND HOW

let renderingTickOffset = TicksCalcService.msToRoundedTicks(-100);

function start(){

	FirebaseRefService.initThen(function(){
		const commandsRef = FirebaseRefService.ref.child('commands');
		commandsRef.limitToLast(1).on('child_added', function(commandSnapshot){

			const cmd = commandSnapshot.val();

			console.log('received cmd: ',cmd);

			var entity = GameDataService.data.entities[cmd.eId];
			if (entity) entity.controls[cmd.key] = cmd.val;

			intakeCommand(cmd);
			// COMING SOON: Crazy stuff involving ticks and so on!

		});
	});

}


function intakeCommand(cmd){
	knownCommandsByTick[cmd.tick].push(cmd);
	if (latestKnownValidTick > cmd.tick) {
		latestKnownValidTick = cmd.tick - 1;
		reRender();
	}
}

module.exports = {
	start: start
}