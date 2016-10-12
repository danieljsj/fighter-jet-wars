'use strict';

// nulls:
var NullP = require('./components/nulls/p');
var NullControls = require('./components/nulls/controls');

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

	control(dT){ // dT could potentially be used by AI.

		// ventually this would be real because you'd need to go scan the stream of commands for controls for this entity... but for now we're just letting new commands land on the entity and modify it right away.
		// var user = this.player.user;

		// if ( user && (this.id===user.controlledEntityId) ) {
		// 	this.controls = user.controls;
		// } else {


			// to debug, run only this line:
			// this.controls = this.getAiControls(dT)



		// }

		// for (var key in nullControls){
		// 	if (!this.controls[key]) this.controls[key] = nullControls[key];
		// }

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