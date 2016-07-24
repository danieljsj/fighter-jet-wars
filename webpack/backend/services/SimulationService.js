'use strict';

const GameDataInitiationService = require('./GameDataInitiationService');
const GDS = require('../../common/services/GameDataService');

const GameParamsService = require('../../common/services/GameParamsService');
const TicksCalcService = require('../../common/services/TicksCalcService');

const SnapshotService = require('../../common/services/SnapshotService');

const CommandsReadingService = require('../../common/services/CommandsReadingService');

//////////////

module.exports = {
	start: start,
	afterTick: afterTick,
	snapshotThen: snapshotThen,
}

function start(ref) {

	startTicks(); // ticks start first; app spins fine on empty data tree.
	GameDataInitiationService.run(); // data streams in gracefully
	CommandsReadingService.start();
}

function afterTick(cb){
	queue.push(cb);
}


//////////////

// SWITCH TO USING ACTUAL TICKS:
// something like this, sort of;
//  Math.round((new Date()).getTime()/GameParamsService.params.ticksPerSecond); 


let serverFirstTick = null;

function startTicks(){
	serverFirstTick = TicksCalcService.latest();
	latestSimulatedTick = serverFirstTick-1; // with these equal, it would spin a sim with dT=0 on its first cycle. That could give some weird effects.
	doTick();
}


let latestSimulatedTick = null;
let skippedTicks = []; // if we detect we skipped a tick, we'll post it in a feed; browsers will be told about this, and can re-simulate using the same skips-and-double-ticks sequence as the server to retain fidelity

function getDt(currTick){
	let dT=0;
	let t = latestSimulatedTick;
	while ( t < currTick ) {
		t++; dT++;
		if ( t < currTick ) {
			skippedTicks[t] = true;
		}
	}
	latestSimulatedTick = currTick;
	return dT;
}


let queue = [];

function doTick(){


	let c = true;

	if (c) process.stdout.write('\x1B[2J'); // pseudo clear console
	
	let currTick = TicksCalcService.latest();

	let dT = getDt(currTick);

	if (c) console.log('dT: ',dT);
	if (c) console.log('currTick: ',currTick);

	// flexible "duck" interfacing/typing-- if (entity.quack) 		entity.quack();
	if (c) console.time('control');
	for (const id in GDS.data.entities) { if (GDS.data.entities[id].control) GDS.data.entities[id].control(dT); }
	if (c) console.timeEnd('control');

	if (c) console.time('accelerate');
	for (const id in GDS.data.entities) { if (GDS.data.entities[id].accelerate) GDS.data.entities[id].accelerate(dT); }
	if (c) console.timeEnd('accelerate');

	if (c) console.time('move');
	for (const id in GDS.data.entities) { if (GDS.data.entities[id].move) GDS.data.entities[id].move(dT); }
	if (c) console.timeEnd('move');

	if (c) console.time('sense');
	for (const id in GDS.data.entities) { if (GDS.data.entities[id].sense) GDS.data.entities[id].sense(dT); }
	if (c) console.timeEnd('sense');

	// if (c) console.time('fbPublish');
	// GDS.data.entities.forEach(function(entity){	if (entity.fbPublish)	entity.fbPublish(dT);  	});
	// if (c) console.timeEnd('fbPublish');

	while (queue[0]) {
		queue[0](currTick, dT);
		queue.shift();
	}

	let timeout = TicksCalcService.timeTillNext()+1; // come in 1ms 'late' so it's definitely in the past.
	if (c) console.log('timeout: ',timeout);
	setTimeout(doTick,timeout);

	for (var id in GDS.data.entities){
		if (c) console.log('GDS.data.entities[id].p: \n',GDS.data.entities[id].p);
	}

}

function snapshotThen(currTick,cb){
	cb( new SnapshotService.Snapshot( GDS.data , currTick) );
}