'use strict';

const SimulationService = require('../../SimulationService');
const GDS = require('../../GameDataService');
const FirebaseRefService = require('../../FirebaseRefService');

const sendCommand = require('../../CommandsService').send;

const turnLeft = require('./aiScripts/turnLeft');

/////////


function start(){
	FirebaseRefService.initThen(function(){

		tickWork();

	});

}

function tickWork(){

	SimulationService.afterTick(function(currTick,dT){

		const entities = GDS.data.entities;

		for (var id in entities) {
			const entity = entities[id];
			if (! entity.player.user){
				turnLeft(entity.id)
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