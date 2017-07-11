'use strict';

const SimulationS = require('../../SimulationS');
const FirebaseRefS = require('../../FirebaseRefS');

const sendCommand = require('../../io/CommandsS').send;

const turnLeft = require('./aiScripts/turnLeft');

/////////


let sim; // maybe at some point we'd rework this to allow multiple simulations to have ai apply to them... but doing so would require a lot -- including prevention of sending of signals to server!

function start(mainSim){
	FirebaseRefS.initThen(function(){
		sim = mainSim;
		tickWork();
	});

}

function tickWork(){

	sim.afterCaughtUpTick(function(currTick,dT){


		const entities = sim.gD.entities;

		for (const id in entities) {

			const entity = entities[id];
			turnLeft(entity.id); ////////////			
			if (entity.player) {
				if (! entity.player.user){
					turnLeft(entity.id); /////
				}
			} else {
				debugger;
			}
		}

		setTimeout(function reQueue(){
			tickWork();
		},5);
	});

}


module.exports = {
	start: start,
}