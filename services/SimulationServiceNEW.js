'use strict';

var keyMirror = require('keymirror');

const doTick = require('./doTick');
const GlobalStreamingService = require('./GlobalStreamingService');
const TicksCalcService = require('./TicksCalcService');
const params = require('./GameParamsService').params;

const _constants = keyMirror({
	// options for what point this simulation should seek to sustain

	SIMULATE_TO_NOW: null,
	SIMULATE_TO_LAG: null,
	SIMULATE_TO_TICK: null,

});

const serv = {
	Simulation: Simulation,
}






function Simulation(opts){

	this.tickSnapshots = {};
	// later: // this.hypotheticalTicksCommands = {}; // used for simulations into the future only; destroyed when simulation (e.g. for AI) is destroyed

	this.gD = opts.gD;

	if (!this.gD) throw new Error('simulation cannot exist without data!');

	this.publishSkip = opts.publishSkip || function(){};

	this.useServerSnapshots = opts.useServerSnapshots || true,
	this.render = opts.render || false, // not sure how this will work; since simulations are now holding their own data, maybe GameDataService is now MainGameDataService, and has a function to getCurrentData out of the simulation saved as main. not sure who injects who into what there.

	this.targetTick = opts.targetTick || function(){
		if (env.isClient()) {
			return TicksCalcService.latest();
		} else {
			return TicksCalcService.latest()-params.serverLagTicks;
		}
	}

	const that=this; /////////// BEWARE!!!!!!!!! ADDDING THESE CALLBACKS TO BE SAVED IN THE GLOBALSTREAMING SERVICE, WHERE THEY WILL BE KEPT, WILL CREATE A MEMORY LEAK IF WE'RE CREATING LOTS OF THESE SIMULATIONS! BECAUSE IT CAN SEE THE SIMULATION'S SCOPE!
	
	GlobalStreamingService.addCommandAddedCallback(function(cmd){
		that.rewindPast(cmd.tick);
	});

	GlobalStreamingService.addCommandChangedCallback(function(cmd){
		that.rewindPast(Math.min(cmd.tick, cmd.getFormerTick()));
	});

	GlobalStreamingService.addServerSnapshotCallback(function(snapshot){
		
		that.purgeSnapshotsBefore(snapshot.tick());
		/// TODO: DIFF THE SNAPSHOT AGAINST LIVE DATA; IF IT'S THE SAME, NO NEED TO TAKE ANY ACTION!!!!
			

				// UNTIL THEN, JUST GO BIG:
				that.purgeSnapshotsAfterAndIncluding(snapshot.tick());
				///
				that.gD = SnapshotService.makeGameDataFromSnapshot(latestQualifyingSnapshot);



	});

}

Simulation.prototype.rewindPast = function(cutoffTick){
	const that=this;
	this.finishTick().then(function rewindNow(){

		if(that.gD.tick < cutoffTick) return;

		let latestQualifyingSnapshotTick = -Infinity;
		let latestQualifyingSnapshot = null;

		// how to check a snapshot
		const checkSnapshot = function(snapshot){
			if(!snapshot)return;

			if ( (latestQualifyingSnapshotTick<snapshot.tick()) && (snapshot.tick()<cutoffTick) ){
				latestQualifyingSnapshotTick = snapshot.tick();
				latestQualifyingSnapshot = snapshot;
				return {isOlder: true};
			} else {
				return {isOlder: false};
			}
		}


		checkSnapshot(_latestServerSnapshot);

		for (const tickStr in that.tickSnapshots){

			const res = checkSnapshot(that.tickSnapshots[tickStr]);

			if (!res.isOlder) {
				delete that.tickSnapshots[tickStr];
				if (ToLog.snapshotBacktrack) console.log('deleted my invalidated snapshot');
			}

		}

		that.gD = SnapshotService.makeGameDataFromSnapshot(latestQualifyingSnapshot);

		// SOMETHING TO CONTINUE SIM... OR MAYBE IT WILL ALREADY CONTINUE...  ... no, we want to restart it now to catch up

		that.catchUp();

	});
}


Simulation.prototype.start = function(targetTick){




	

}

Simulation.prototype.doTick = function(){

	const dT = 1; // eventually we may allow some shenanigans here for servers struggling to keep up... and they'll publish their skips and all that... but for now I'm assuming enough time to sim, and going with 1

	doTick(this.gD);

	while (queue[0]) { // currently used for: snapshot requests; do this after a tick.
		queue[0](currTick, dT);
		queue.shift();
	}
	
	if (env.isBrowser()) {
		SkyCanvasService.renderEntities(this.gD.entities);
 	}

 	let timeout;
 	if ( -1 === this.gD.tick() - this.targetTick() ){
		timeout = TicksCalcService.timeTillNext()+1; // come in 1ms 'late' so it's definitely in the past.
 	} else if ( -1 > this.gD.tick() - this.desiredTick() ) {
 		timeout = 0;
 	} else {
 		throw new Error('why on earth is the sim ahead of its desired tick?'); /// NOTE: this doesn't yet accommodate sim that wants to be in the fugure; there would be an option saying 'stop when reach target', or something like that.
 	}
	
	if (ToLog.time) console.log('timeout: ',timeout);

	setTimeout(this.doTick.bind(this), timeout);

}


Simulation.prototype.stop = function(){
	//...
}

Simulation.prototype.purgeSnapshotsAfterAndIncluding = function(firstPurgedTick){
	for (const tickStr in this.tickSnapshots){
		if (parseInt(tickStr) >= firstPurgedTick){
			delete this.tickSnapshots[tickStr];
		}
	}
}
Simulation.prototype.purgeSnapshotsBefore = function(firstNonPurgedTick){
	for (const tickStr in this.tickSnapshots){
		if (parseInt(tickStr) < firstPurgedTick){
			delete this.tickSnapshots[tickStr];
		}
	}
}

module.exports = serv;