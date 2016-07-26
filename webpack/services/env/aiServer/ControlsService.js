const SimulationService = require('../../SimulationService');
const GameDataService = require('../../GameDataService');
const FirebaseRefService = require('../../FirebaseRefService');

const sendCommand = require('../../CommandsService').send;

/////////

function turnLeftAlways(){

	SimulationService.afterTick(function(currTick,dT){
		sendCommand('left',1);
		// turnLeftAlways(); // this recursion is killing everything! /// OOOH! Because afterTick is adding another thing to the queue... making it infinitely loop because the queue is growing itself as it tries to fininsh itself! Okay. BUT WHY THE HECK DIDN'T I GET ANY KIND OF ERROR IN THE LOGS!? MAXIMUM CALL SIZE, ETC.......
		setTimeout(function(){ // this successfully doesn't break it because the queue concludes synchronously and THEN we add this to the queue, and it will be executed after the NEXT tick.
			turnLeftAlways();
		},0)
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