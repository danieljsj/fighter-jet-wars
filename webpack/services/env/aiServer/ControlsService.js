const SimulationService = require('../../SimulationService');
const GameDataService = require('../../GameDataService');
const FirebaseRefService = require('../../FirebaseRefService');

const sendCommand = require('../../CommandsService').send;

/////////

function turnLeftAlways(){

	SimulationService.afterTick(function(currTick,dT){
		const gD = GameDataService.data;
		sendCommand('left',1);
		turnLeftAlways();
	});

}


function start(){
	FirebaseRefService.initThen(function(){
		turnLeftAlways();
	});
}


module.exports = {
	start: start,
}