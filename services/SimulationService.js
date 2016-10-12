'use strict';

var keyMirror = require('keymirror');

const params = require('./GameParamsService').params;
const env = require('./env');
const ToLog = require('./ToLog');

const doTick = require('./doTick');
const GlobalStreamingService = require('./GlobalStreamingService');
const TicksCalcService = require('./TicksCalcService');

const SnapshotService = require('./SnapshotService');
const ServerSnapshotsService = require('./io/ServerSnapshotsService');

const serv = {
	Simulation: Simulation,
}





function Simulation(opts){

	this.tickSnapshots = {};
	// later: // this.hypotheticalTicksCommands = {}; // used for simulations into the future only; destroyed when simulation (e.g. for AI) is destroyed

	if (!opts.gD) throw new Error('simulation cannot exist without a data object!');
	
	this.gD = opts.gD;

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
	this.gD.tickStarted = this.gD.tickCompleted = this.targetTick()-1;

	const that=this; /////////// BEWARE!!!!!!!!! TODO:FIX: ADDING THESE CALLBACKS TO BE SAVED IN THE GLOBALSTREAMING SERVICE, WHERE THEY WILL BE KEPT, WILL CREATE A MEMORY LEAK IF WE'RE CREATING LOTS OF THESE SIMULATIONS! BECAUSE IT CAN SEE THE SIMULATION'S SCOPE!
	
	GlobalStreamingService.addCommandAddedCallback(function(cmd){
		that.rewindPast(cmd.tick);
	});

	GlobalStreamingService.addCommandChangedCallback(function(cmd){
		that.rewindPast(Math.min(cmd.tick, cmd.getFormerTick()));
	});

	console.log('env.isServer()',env.isServer());

	if (!env.isServer()) {
		GlobalStreamingService.addServerSnapshotCallback(function(snapshot){

			that.purgeSnapshotsBefore(snapshot.tick());

			that.tickSnapshots[snapshot.tick()]=snapshot;

			that.rewindPast(snapshot.tick());

		});
	}

}

Simulation.prototype.rewindPast = function(cutoffTick){
	this.purgeSimSnapshotsAfterAndIncluding(cutoffTick);
	const that=this;
	this.afterTick(function rewindNow(){

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

		// console.log('that.tickSnapshots',that.tickSnapshots);
		// throw '';

		// checkSnapshot(_latestServerSnapshot); //// BROKEN AND I BELIEVE UNNECESSARY

		for (const tickStr in that.tickSnapshots){

			const res = checkSnapshot(that.tickSnapshots[tickStr]);

			if (!res.isOlder) {
				delete that.tickSnapshots[tickStr];
				if (ToLog.snapshotBacktrack) console.log('deleted my invalidated snapshot');
			}

		}

		if ((!env.isServer()) && latestQualifyingSnapshot) { // server should not be backing up!... though... I'd have to wonder why it's even in this area at all...
			that.gD = SnapshotService.makeGameDataFromSnapshot(latestQualifyingSnapshot);
		}

	});
} 

Simulation.prototype.start = function(targetTick){
	this.doTick();
}

Simulation.prototype.afterCaughtUpTick = function(cb){
	caughtUpQueue.push(cb);
}
const caughtUpQueue = [];

Simulation.prototype.afterTick = function(cb){
	queue.push(cb);
}
const queue = [];

let timeLastTickFinished = -Infinity;



Simulation.prototype.doTick = function(){


	console.log('env.isNode()',env.isNode());
	console.log('env.isServer()',env.isServer());
	console.log('env.isAiClient()',env.isAiClient());
	console.log('env.isClient()',env.isClient());
	console.log('env.isBrowser()',env.isBrowser());


	if (ToLog.time) console.log('time since last finished (SHOULD be EXACTLY less than last timeout)', new Date().getTime() - timeLastTickFinished );

	// TODO EVENTUALLY: add serverSkippedTicks system; i.e. if dT is > 1, send out some server skipped ticks.


 	if (ToLog.ticks) {
 		console.log('before doTick');
 		console.log('this.gD.tickStarted.....',this.gD.tickStarted   );
 		console.log('this.gD.tickCompleted...',this.gD.tickCompleted );
 		console.log('this.targetTick().......',this.targetTick()     );
 	}

	const dT = 1; // eventually we may allow some shenanigans here for servers struggling to keep up... and they'll publish their skips and all that... but for now I'm assuming enough time to sim, and going with 1
	this.doTickPhases(dT);

 	if (ToLog.ticks) {
 		console.log('after doTick');
 		console.log('this.gD.tickStarted.....',this.gD.tickStarted   );
 		console.log('this.gD.tickCompleted...',this.gD.tickCompleted );
 		console.log('this.targetTick().......',this.targetTick()     );
 	}



	while (queue[0]) { // currently used for: snapshot requests; do this after a tick.
		queue[0](this.gD.tick(), dT);
		queue.shift();
	}
	if (this.targetTick() == this.gD.tickCompleted ){
		while (caughtUpQueue[0]) { // currently used for: snapshot requests; do this after a tick.
			caughtUpQueue[0](this.gD.tick(), dT);
			caughtUpQueue.shift();
		}
	}

	if (  env.isServer()  &&  (! (this.gD.tick()%params.ticksPerSnapshot) )  ){
		ServerSnapshotsService.send(this.gD);
	}
	
	if (env.isBrowser()) {
		SkyCanvasService.renderEntities(this.gD.entities);
 	}

 	if (ToLog.ticks) {
 		console.log('after queues, snapshot, render');
 		console.log('this.gD.tickStarted.....',this.gD.tickStarted   );
 		console.log('this.gD.tickCompleted...',this.gD.tickCompleted );
 		console.log('this.targetTick().......',this.targetTick()     );
 	}


 	let timeout;
 	if ( this.targetTick() - this.gD.tick() == 0 /* we are caught up */ ){
		timeout = TicksCalcService.timeTillNext()+1; // come in 1ms 'late' so it's definitely in the past.
 	} else if ( this.targetTick() - this.gD.tick() > 0 /* not yet caught up */) {
 		timeout = 0;
 	} else {
 		if (false) throw new Error('why on earth is the sim ahead of its desired tick?'); /// NOTE: this doesn't yet accommodate sim that wants to be in the fugure; there would be an option saying 'stop when reach target', or something like that.
 		const NUM_EXTRA_TICKS = 5
 		console.warn('why on earth is the sim ahead of its desired tick?  delaying by '+NUM_EXTRA_TICKS+' extra ticks via longer timeout...'); /// NOTE: this doesn't yet accommodate sim that wants to be in the fugure; there would be an option saying 'stop when reach target', or something like that.
 		timeout = NUM_EXTRA_TICKS*TicksCalcService.msPerTick()+TicksCalcService.timeTillNext()+1;
 	}
	

	setTimeout(this.doTick.bind(this), timeout);

	if (ToLog.time) console.log('time since last finished (SHOULD be SLIGHTLY LESS THAN last timeout)', new Date().getTime() - timeLastTickFinished );
	timeLastTickFinished = new Date().getTime();
	if (ToLog.time) console.log('||| TIMEOUT |||: ',timeout);

}


Simulation.prototype.doTickPhases = function(dT){

	// possible later thing: name. perhaps each gD has a name, like 'main_sim', 'ai_projection', etc.
	console.log('dT',dT);
	this.gD.tickStarted = this.gD.tickCompleted + dT;

	const T = this.gD.tickStarted;	

	if (ToLog.time) console.log('dT: ',dT);

	if (ToLog.time) console.time('control');
	for (const t in GlobalStreamingService.ticksCommands){
		if ( (t<=T)&&(t>T-dT) ){
			const tCmds = GlobalStreamingService.ticksCommands[t];
			for (const tCmdId in tCmds){
				const cmd = tCmds[tCmdId];
				const e = this.gD.entities[cmd.eId];
				if (e) e.controls[cmd.key] = cmd.val;
			}
		}
	}
	if (ToLog.time) console.timeEnd('control');

	if (ToLog.time) console.time('accelerate');
	for (const id in this.gD.entities) { if (this.gD.entities[id].accelerate) this.gD.entities[id].accelerate(dT,T); }
	if (ToLog.time) console.timeEnd('accelerate');

	if (ToLog.time) console.time('move');
	for (const id in this.gD.entities) { if (this.gD.entities[id].move) this.gD.entities[id].move(dT,T); }
	if (ToLog.time) console.timeEnd('move');

	if (ToLog.time) console.time('sense');
	for (const id in this.gD.entities) { if (this.gD.entities[id].sense) this.gD.entities[id].sense(dT,T); }
	if (ToLog.time) console.timeEnd('sense');

 	if (ToLog.gD) console.log(gD);

	if (ToLog.p) logPs(gD);

	this.gD.tickCompleted = this.gD.tickStarted;

}


function logPs(gD){
	let i = 0;
	if (! (gD.tick % params.ticksPerSecond) ){
		for (const id in gD.entities) { 
			let p = gD.entities[id].p; 

			console.log(''
				+'e'+i++ +': '
				+'{ x:'+p.x
				+', y:'+p.y
				+', dir:'+p.direction
				+', speed:'+p.speed
				+'}'
			); 
		}
	}
}

Simulation.prototype.stop = function(){
	//...
}

Simulation.prototype.purgeSimSnapshotsAfterAndIncluding = function(earliestPurgedTick){
	for (const tickStr in this.tickSnapshots){
		if (parseInt(tickStr) >= earliestPurgedTick){
			delete this.tickSnapshots[tickStr];
		}
	}
}
Simulation.prototype.purgeSnapshotsBefore = function(earliestNonPurgedTick){
	for (const tickStr in this.tickSnapshots){
		if (parseInt(tickStr) < earliestNonPurgedTick){
			delete this.tickSnapshots[tickStr];
		}
	}
}

module.exports = serv;