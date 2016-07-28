'use strict';

var keyMirror = require('keymirror');

const doTick = require('./doTick');



let _latestServerSnapshot = null;

const _serverSkippedTicks = {};
const _ticksRealCommands = {};
const _ticksLocalCommands = {};


service = {
	// we can keep these centralized for the whole client
	

			



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


function intakeCommand(cmd){
	const cmdEvent = new Event('',cmd.tick,)
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

	this.useServerSnapshots = opts.useServerSnapshots || true,
	this.render = opts.render || false, // not sure how this will work; since simulations are now holding their own data, maybe GameDataService is now MainGameDataService, and has a function to getCurrentData out of the simulation saved as main. not sure who injects who into what there.

}

Simulation.prototype.clearAllDataOlderThan = function(cutoffTick){
	const tickLogs = {
		serverSkips: _serverSkippedTicks,
	 	realCommands: _ticksRealCommands,
	 	localCommands: _ticksLocalCommands,
	 	localSnapshots: this.tickSnapshots,
	}
	for (const logName in tickLogs) { 
		const tickLog = tickLogs[logName];
		
		for (const tickStr in tickLog){
			if (parseInt(tickStr) < cutoffTick){
				delete tickLog[tickStr];
			}
		}
	}
}

Simulation.prototype.rewindPast = function(cutoffTick){
	this.finishTick().then(function rewindNow(){

		let latestQualifyingSnapshotTick = -Infinity;
		let latestQualifyingSnapshot = null;

		const checkSnapshot = function(snapshot){
			if(!snapshot)return;

			if ( (latestQualifyingSnapshotTick<snapshot.tick()) && (snapshot.tick()<cutoffTick) ){
				latestQualifyingSnapshotTick = snapshot.tick();
				latestQualifyingSnapshot = snapshot;
			}
		}
		checkSnapshot(_latestServerSnapshot)
		for (this.tickSnapshots){

		}

		// loop simulation

	});
}





