'use strict';

const GameDataService = require('./GameDataService');

const GameParamsService = require('../../common/services/GameParamsService');
const TicksCalcService = require('../../common/services/TicksCalcService');

const SkyCanvasService = require('./SkyCanvasService');


//////////////

module.exports = {
	start: start,
	afterTick: afterTick,
}

function start(ref) {

	startTicks(); // ticks start first; app spins fine on empty data tree.
	KnownEntitiesService.start(); // data streams in gracefully

}

function afterTick(cb){
	queue.push(cb);
}


//////////////

// SWITCH TO USING ACTUAL TICKS:
// something like this, sort of;
//  Math.round((new Date()).getTime()/GameParamsService.params.ticksPerSecond); 


let browserFirstTick = null;

function startTicks(){
	browserFirstTick = TicksCalcService.latest();
	latestSimulatedTick = browserFirstTick-1; // with these equal, it would spin a sim with dT=0 on its first cycle. That could give some weird effects.
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


const queue = [];

function doTick(){

	const gD = GameDataService.data;

	const c = false;
	
	let currTick = TicksCalcService.latest();

	let dT = getDt(currTick);

	if (c) console.log('dT: ',dT);
	if (c) console.log('currTick: ',currTick);

	// flexible "duck" interfacing/typing-- if (entity.quack) 		entity.quack();
	if (c) console.time('control');
	for (const id in gD.entities) { if (gD.entities[id].control) gD.entities[id].control(dT); }
	if (c) console.timeEnd('control');

	if (c) console.time('accelerate');
	for (const id in gD.entities) { if (gD.entities[id].accelerate) gD.entities[id].accelerate(dT); }
	if (c) console.timeEnd('accelerate');

	if (c) console.time('move');
	for (const id in gD.entities) { if (gD.entities[id].move) gD.entities[id].move(dT); }
	if (c) console.timeEnd('move');

	if (c) console.time('sense');
	for (const id in gD.entities) { if (gD.entities[id].sense) gD.entities[id].sense(dT); }
	if (c) console.timeEnd('sense');

	while (queue[0]) {
		queue[0](currTick, dT);
		queue.shift();
	}

	SkyCanvasService.renderEntities();

	let timeout = TicksCalcService.timeTillNext()+1; // come in 1ms 'late' so it's definitely in the past.
	if (c) console.log('timeout: ',timeout);
	setTimeout(doTick,timeout);

	if (c && KnownEntitiesService.data.entities[0]) console.log('KnownEntitiesService.data.entities[0].p: \n',KnownEntitiesService.data.entities[0].p);
	if (c && KnownEntitiesService.data.entities[0]) console.log('KnownEntitiesService.data.entities[0].atts: \n',KnownEntitiesService.data.entities[0].atts);

}