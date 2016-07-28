'use strict';

var keyMirror = require('keymirror');

const doTick = require('./doTick');



service = {
	// we can keep these centralized for the whole client
	knownEventsByTick: {
		localEntityCommands: {}
		entityCommands: {}
		serverSkips: {}
	}

			



		// if you ARE the server, this is a log of your own skips. might as well keep them; better to only ever skip ticsk, never un-skip them... because if you do happen to be re-simulating, you're already going to be behind! also, un-skipping them would just create more work for the clients as they re-simulate to accommodate the change.
		// if you are a client, you keep this here; 

	constants: keyMirror({
		// options for what point this simulation should seek to sustain
		SIMULATE_TO_NOW: null,
		SIMULATE_TO_LAG: null,
		SIMULATE_TO_TICK: null,

	}),

	Simulation: Simulation,
}


function intakeEvent(event){ 
	// note: events are things that can never be undone; 
		// commands can only be issued by a client(browser/ai) when it is simulating up-to-date; not during re-sims, and no take-backs.
		// serverSkips can only be issued by the core server; as mentioned above it won't go back on this. it will be subscribed to its own skips like clients are, but unlike them, it will get them synchronously. (or maybe on a setTimeout(0)?)

}

function Event(tick,type,payload){
	this.tick = tick;
	this.type = type;
	this.payload = payload;
}




function Simulation(opts){

	this.tickSnapshots = {};

	this.gG = opts.gD || throw 'simulation cannot exist without data!';

	this.publishSkip = opts.publishSkip || function(){};



}