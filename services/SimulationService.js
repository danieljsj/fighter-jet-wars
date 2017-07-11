'use strict';

var keyMirror = require('keymirror');

const params = require('./ParamsS').params;
const env = require('./env');
const ToLog = require('./ToLog');

const InputsS = require('./InputsS');
const TicksCalcS = require('./TicksCalcS');

const SnapshotS = require('./SnapshotS');
const ServerSnapshotsS = require('./io/ServerSnapshotsS');

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
	this.render = opts.render || false, // not sure how this will work; since simulations are now holding their own data, maybe GameDataS is now MainGameDataS, and has a function to getCurrentData out of the simulation saved as main. not sure who injects who into what there.

	this.targetTick = opts.targetTick || function(){
		if (env.isClient()) {
			return TicksCalcS.latest();
		} else {
			return TicksCalcS.latest()-params.serverLagTicks;
		}
	}
	this.gD.tickStarted = this.gD.tickCompleted = this.targetTick()-1;

	const that=this; /////////// BEWARE!!!!!!!!! TODO:FIX: ADDING THESE CALLBACKS TO BE SAVED IN THE GLOBALSTREAMING SERVICE, WHERE THEY WILL BE KEPT, WILL CREATE A MEMORY LEAK IF WE'RE CREATING LOTS OF THESE SIMULATIONS! BECAUSE IT CAN SEE THE SIMULATION'S SCOPE!
	
	InputsS.addCommandAddedCb(function(cmd){
		if (ToLog.command){console.log("About to rewindToAtLeast cmd.tick: "+cmd.tick+" ... curr tick is ..."+that.gD.tick());}
		debugger;
		that.rewindToAtLeast(cmd.tick);
	});

	InputsS.addCommandChangedCb(function(cmd){
		that.rewindToAtLeast(Math.min(cmd.tick, cmd.getFormerTick()));
	});

	if (!env.isServer()) {
		InputsS.addServerSnapshotCb(function(snapshot){

			if (ToLog.snapshot) console.log('SNAPSHOT RECEIVED FOR TICK '+snapshot.tick());

			that.purgeSnapshotsBefore(snapshot.tick());

			that.tickSnapshots[snapshot.tick()]=snapshot;

			that.rewindToAtLeast(snapshot.tick());

		});
	}

}

Simulation.prototype.rewindToAtLeast = function(cutoffTick){
	if (cutoffTick > this.gD.tick()){
		if (ToLog.rewind) console.log('no need to rewind; cutoffTick '+cutoffTick+' is ahead of this simulation tick which is '+this.gD.tick()+' by '+cutoffTick-this.gD.tick());
		return;
	}
	this.purgeSimSnapshotsAfter(cutoffTick);
	const that=this;
	this.afterTick(function rewindNow(){

		console.log('that.gD.tick < cutoffTick :',that.gD.tick < cutoffTick);
		if(that.gD.tick < cutoffTick) return;

		let latestQualifyingSnapshot = null;

		if (ToLog.rewind) console.log('cutoffTick',cutoffTick); // NaN sometimes?
		if (ToLog.rewind) console.log('that.tickSnapshots',that.tickSnapshots); /////// on server, this is coming up pretty empty, such that  there are no past snapshots


// [2017-01-18T00:50:00.603Z] cutoffTick 8908203:4968
// [2017-01-18T00:50:00.603Z] that.tickSnapshots { '8908203:6027': // only snapshot is well after the incoming command, so there's no snapshot to use 
//    Snapshot {
//      tickStarted: 89082036027,
//      tickCompleted: 89082036027,
//      users: { b7sEsa8pUWOyWnDYAQCdPjdhFG02: [Object] },
//      players: 
//       { '-Kaj262EVUI4zpNfHfBj': [Object],
//         '-Kaj22mvY4e39z7f2FBq': [Object] },
//      entities: 
//       { '-Kaj262T5fC8L7D-B3Dr': [Object],
//         '-Kaj22mwi7oGpNkOZnUd': [Object] } } }



		for (const tickStr in that.tickSnapshots){

			const snapshotCandidate = that.tickSnapshots[tickStr];

			if ( 
				(
					(!latestQualifyingSnapshot)
					||
					(latestQualifyingSnapshot.tick()<snapshotCandidate.tick()) 
				)
				&& 
				(snapshotCandidate.tick()<=cutoffTick) // NOTE: it is "<=" because we're killing snapshots ">" the cutoffTick, so must accept "=" to cutoffTick. We accept things at the cutoff, "a point or level that is a designated limit of something."
			){
				latestQualifyingSnapshot = snapshotCandidate;
			}

		}

		if (ToLog.rewind) {
			console.log('latestQualifyingSnapshot',latestQualifyingSnapshot); // PROBLEM: KEEPS COMING UP NULL! SO THEN THE SIM NEVER REWINDS...
			if (latestQualifyingSnapshot && ToLog.p){
				let i=0;
				for (const eId in latestQualifyingSnapshot.entities) {
					console.log(i++,latestQualifyingSnapshot.entities[eId].p);
				}
			}
		}
		if (latestQualifyingSnapshot) { // server should not be backing up!... though... I'd have to wonder why it's even in this area at all...
			if (ToLog.rewind) console.log('(used a snapshot)');
			that.gD = SnapshotS.makeGameDataFromSnapshot(latestQualifyingSnapshot);
			if (ToLog.rewind) console.log('resulting gD:',that.gD);
		}

	});
} 

Simulation.prototype.start = function(targetTick){
	this.doTick();
}

const caughtUpQueue = [];
Simulation.prototype.afterCaughtUpTick = function(cb){
	setTimeout(function(){
		caughtUpQueue.push(cb);
	},0);
}

const queue = [];
Simulation.prototype.afterTick = function(cb){
	setTimeout(function(){
		queue.push(cb);
	},0);
}

let timeLastTickFinished = -Infinity;



Simulation.prototype.doTick = function(){

	if (ToLog.env){
		console.log('env.isNode()',env.isNode());
		console.log('env.isServer()',env.isServer());
		console.log('env.isAiClient()',env.isAiClient());
		console.log('env.isClient()',env.isClient());
		console.log('env.isBrowser()',env.isBrowser());
	}

	if (ToLog.time) console.log('time since last finished (SHOULD be EXACTLY less than last timeout)', new Date().getTime() - timeLastTickFinished );

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
	if (this.targetTick() <= this.gD.tickCompleted ){
		while (caughtUpQueue[0]) { // currently used for: snapshot requests; do this after a tick.
			caughtUpQueue[0](this.gD.tick(), dT);
			caughtUpQueue.shift();
		}
	}

	if (  env.isServer()  &&  (! (this.gD.tick()%params.ticksPerServerSnapshot) )  ){
		ServerSnapshotsS.send(this.gD);
	}

	if ( ! (this.gD.tick()%params.ticksPerLocalSnapshot) ) {
		this.tickSnapshots[this.gD.tick()] = new SnapshotS.Snapshot(this.gD);
	}

	
	// not doing browser-dependent stuff from here because it kills module loading in node; instead, app-browser.js passes the sim into browser-dependent services.

 	if (ToLog.ticks) {
 		console.log('after queues, snapshot, render');
 		console.log('this.gD.tickStarted.....',this.gD.tickStarted   );
 		console.log('this.gD.tickCompleted...',this.gD.tickCompleted );
 		console.log('this.targetTick().......',this.targetTick()     );
 	}


 	let timeout;
 	if ( this.targetTick() - this.gD.tick() == 0 /* we are caught up */ ){
		timeout = TicksCalcS.timeTillNext()+1; // come in 1ms 'late' so it's definitely in the past.
 	} else if ( this.targetTick() - this.gD.tick() > 0 /* not yet caught up */) {
 		timeout = 0;
 	} else {
 		if (false) throw new Error('why on earth is the sim ahead of its desired tick?'); /// NOTE: this doesn't yet accommodate sim that wants to be in the fugure; there would be an option saying 'stop when reach target', or something like that.
 		const NUM_EXTRA_TICKS = 5
 		console.warn('why on earth is the sim ahead of its desired tick?  delaying by '+NUM_EXTRA_TICKS+' extra ticks via longer timeout...'); /// NOTE: this doesn't yet accommodate sim that wants to be in the fugure; there would be an option saying 'stop when reach target', or something like that.
 		timeout = NUM_EXTRA_TICKS*TicksCalcS.msPerTick()+TicksCalcS.timeTillNext()+1;
 	}
	

	setTimeout(this.doTick.bind(this), timeout);

	if (ToLog.time) console.log('time since last finished (SHOULD be SLIGHTLY LESS THAN last timeout)', new Date().getTime() - timeLastTickFinished );
	timeLastTickFinished = new Date().getTime();
	if (ToLog.time) console.log('||| TIMEOUT |||: ',timeout);

}


Simulation.prototype.doTickPhases = function(dT){

	// possible later thing: name. perhaps each gD has a name, like 'main_sim', 'ai_projection', etc.
	this.gD.tickStarted = this.gD.tickCompleted + dT;

	const T = this.gD.tickStarted;	
	if (ToLog.readingCommands) console.log("reading commands starting at tick (T)"+T);

	if (ToLog.time) console.log('dT: ',dT);

	if (ToLog.time) console.time('control');
	for (const t in InputsS.ticksCommands){
		if (ToLog.readingCommands) console.log("cmd(s) in t"+t+" "+ ( t==T ? "(SAME)" : (t>T? "(future)" : "(past)") ) ); ///////?TODO: MAKE THIS SHOW PAST AND FUTURE AND PRESENT. ALSO FIX THE FACT THAT CMDS ARE NEVER DYING...
		if ( (t<=T)&&(t>T-dT) ){ // NOTE: there is a faster way to do this loop; namely, just do it for T and others where t < T but greater than T-dT
			
			const tCmds = InputsS.ticksCommands[t];
			for (const tCmdId in tCmds){
				const cmd = tCmds[tCmdId];
				const entity = this.gD.entities[cmd.eId];
				if (entity) entity.controls[cmd.key] = cmd.val;
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

 	if (ToLog.gD) console.log(this.gD);

	if (ToLog.p) logPs(this.gD);

	if (ToLog.pIntervalS && (!((TicksCalcS.latest()/TicksCalcS.ticksPerS())%ToLog.pIntervalS)) ){ logPs(this.gD); }

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
				+', id:'+id
				+'}'
			); 
		}
	}
}

Simulation.prototype.stop = function(){
	//...
}

Simulation.prototype.purgeSimSnapshotsAfterAndIncluding = function(earliestPurgedTick){
	this.purgeSimSnapshotsAfter(earliestPurgedTick-1);
}
Simulation.prototype.purgeSimSnapshotsAfter = function(latestNonPurgedTick){
	for (const tickStr in this.tickSnapshots){
		if (parseInt(tickStr) > latestNonPurgedTick){
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