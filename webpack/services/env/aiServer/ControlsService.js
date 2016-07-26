'use strict';

const SimulationService = require('../../SimulationService');
const GDS = require('../../GameDataService');
const FirebaseRefService = require('../../FirebaseRefService');

const sendCommand = require('../../CommandsService').send;

/////////


const _aiPlayers = {

}


function start(){
	FirebaseRefService.initThen(function(){

		///// not sure if I need this... but I just got a list of _aiPlayers...
		const players = GDS.data.players;
		for (pId in players) {
			const player = players[pId];
			if (!player.user){
				_aiPlayers.push(player);
			}
		}

		console.log('_aiPlayers:',_aiPlayers);

		turnLeftAlways();

	});

}







function tickWork(){

	SimulationService.afterTick(function(currTick,dT){


	});

}































function turnLeftAlways(){

	var lastEntityId;
	for (const id in GDS.data.entities){
	  lastEntityId = id;
	}

	SimulationService.afterTick(function(currTick,dT){
		
		console.log(lastEntityId);

		sendCommand('left',1,lastEntityId);

		
		// INFINITE LOOP HERE DIDN'T THROW...
		// turnLeftAlways(); // this recursion is killing everything! /// OOOH! Because afterTick is adding another thing to the queue... making it infinitely loop because the queue is growing itself as it tries to fininsh itself! Okay. BUT WHY THE HECK DIDN'T I GET ANY KIND OF ERROR IN THE LOGS!? MAXIMUM CALL SIZE, ETC.......
		setTimeout(function(){ // this successfully doesn't break it because the queue concludes synchronously and THEN we add this to the queue, and it will be executed after the NEXT tick.
			turnLeftAlways();
		},0);

	});

}






module.exports = {
	start: start,
}