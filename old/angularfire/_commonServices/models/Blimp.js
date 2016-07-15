'use strict';


var p = require('./components/nulls/p');
var controls = require('./components/nulls/controls');

class Blimp {

	constructor(params){
		this.entityTypeName = 'blimp';

		this.fbRef = params.fbRef;
		this.id = params.id;
		this.player = params.player || false;
		
		// null-starts:
		this.p = p;
		this.controls = null; // will support: fore,back,left,right,tryFire,trySwitch ... but potentially more? Anyway we're not going to declare the object here because I don't want to have to recopy controls a bunch of times. Each turn we're going to just set the controls ref on each unit to either a player's controls, or an ai-generated controls object. AND we'll run validateControls(), where we get to define all this stuff!
		this.thoughts = {}; // TODO! BRING THIS IN FROM THE OLD APP!

	}

	control(dT){ // dT could potentially be used by AI.

		var user = this.player.user;

		if ( user && (this.id===user.controlledEntityId) ) {
			this.controls = user.controls;
		} else {
			this.controls = this.getAiControls(dT)
		}

	}

	getAiControls(dT){
		this.thoughts; // DO SOMETHING WITH THIS!

		// TODO:? make a version of this where the fighter only sees a restricted version of its world; perhaps every 1 second or so, we recalculate who it can see. but for now, let it see everything.
		this.visibleEntities; // let the game calibrate how many things can go into this visibleEntities object based on server load. It also lets us scope what kind of entities can be "seen" -- i.e. if we're going to let comps see and dodge lasers! ALSO -- we might end up maintaining a per-player list of visibleEntities, to reduce redundancy and simulate internet/hive-mind.
		
		return {
			left: true,
			tryFire: true
		} 
	}

	accelerate(dT){

	}

	move(dT){

	}

	sense(dT){

	}

	fbPublish(dT){
		
	}
}


module.exports = Blimp;