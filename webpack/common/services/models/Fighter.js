'use strict';

// nulls:
var nullP = require('./components/nulls/p');
var nullControls = require('./components/nulls/controls');

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
		
		this.fbRef = params.fbRef;
		this.id = params.id;
		this.player = params.player || false;
		// this.playerId = params.playerId || false; for the moment, .player is the only thing used, and can be either a string or an object; things that user .player will eventually want to test for whether it is a string or an object
		
		this.atts = FighterBaseAtts; // at some point, you may be able to "level up" in various atts; but for starters, we'll just use a single global object

		this.p = JSON.parse(JSON.stringify(params.p||nullP));

		this.controls = JSON.parse(JSON.stringify(params.controls||nullControls)); // TODO: GET THESE FROM FIREBASE! ... dude... complicated

		this.thoughts = {}; // TODO! BRING THIS IN FROM THE OLD APP!

	}

	control(dT){ // dT could potentially be used by AI.

		var user = this.player.user;

		if ( user && (this.id===user.controlledEntityId) ) {
			this.controls = user.controls;
		} else {
			this.controls = this.getAiControls(dT)
		}

		for (var key in nullControls){
			if (!this.controls[key]) this.controls[key] = nullControls[key];
		}

	}

	getAiControls(dT){
		this.thoughts; // DO SOMETHING WITH THIS!

		// TODO:? make a version of this where the fighter only sees a restricted version of its world; perhaps every 1 second or so, we recalculate who it can see. but for now, let it see everything.
		this.visibleEntities; // let the game calibrate how many things can go into this visibleEntities object based on server load. It also lets us scope what kind of entities can be "seen" -- i.e. if we're going to let comps see and dodge lasers! ALSO -- we might end up maintaining a per-player list of visibleEntities, to reduce redundancy and simulate internet/hive-mind.
		
		return {
			left: 1,
			tryFire: 1,
		}
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