'use strict';

const SimulationService = require('../../SimulationService');
const GDS = require('../../GameDataService');
const FirebaseRefService = require('../../FirebaseRefService');

const sendCommand = require('../../io/CommandsService').send;

const turnLeft = require('./aiScripts/turnLeft');

/////////


let sim; // maybe at some point we'd rework this to allow multiple simulations to have ai apply to them... but doing so would require a lot -- including prevention of sending of signals to server!

function start(mainSim){
	FirebaseRefService.initThen(function(){
		sim = mainSim;
		tickWork();
	});

}

function tickWork(){

	sim.afterTick(function(currTick,dT){


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