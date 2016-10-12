'use strict';

// empties:
var NullP = require('./components/empties/p');
var NullControls = require('./components/empties/controls');

// atts:
var FighterBaseAtts = require('./components/atts/FighterBaseAtts');

// methods:
var AircraftMethods = require('./components/methods/AircraftMethods');
var EntityMethods = require('./components/methods/EntityMethods');
var FlyerMethods = require('./components/methods/FlyerMethods');


//////////////


class Fighter {

	constructor(params){
		params = params || {};

		this.entityTypeName = 'fighter';
		
		this.id = params.id;
		this.player = params.player || false;
		this.playerId = params.playerId || false;
		
		this.atts = FighterBaseAtts; // at some point, you may be able to "level up" in various atts; but for starters, we'll just use a single global object

		this.p = params.p || new NullP();

		this.controls = params.controls || new NullControls(); // TODO: GET THESE FROM FIREBASE! ... dude... complicated

		this.thoughts = {}; // TODO! BRING THIS IN FROM THE OLD APP!

	}

	control(dT,T){ 

		///// not sure where this is happening. I thought I wrote some code for finding... oh that was for finding duplicate commands

	}

	accelerate(dT){
		AircraftMethods.accelerate
		.call(this,dT);
	}

	move(dT){
		FlyerMethods.move
		.call(this,dT);
	}

	sense(dT){

	}

	fbPublish(dT){

	}

}

module.exports = Fighter;