'use strict';

const env = require('./env');

const GDS = require('./GameDataService');

const GameParamsService = require('./GameParamsService');
const TicksCalcService = require('./TicksCalcService');

if (env.isBrowser()) {
	var SkyCanvasService = require('./env/browser/SkyCanvasService');
	var KeyboardControlsService = require('./env/browser/KeyboardControlsService');
}


//////////////

module.exports = {
	start: start,
	afterTick: afterTick,
}

function start(ref) {

	startTicks();

	if (env.isBrowser()){

		SkyCanvasService.initCanvas();
		KeyboardControlsService.start();
	}

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
	console.log('startTicks');
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
	
	const clt = false;
	
	const gD = GDS.data;
	
	if (gD) {

		
		let currTick = TicksCalcService.latest();

		let dT = getDt(currTick);

		if (clt) console.log('dT: ',dT);
		if (clt) console.log('currTick: ',currTick);

		// flexible "duck" interfacing/typing-- if (entity.quack) 		entity.quack();
		if (clt) console.time('control');
		for (const id in gD.entities) { if (gD.entities[id].control) gD.entities[id].control(dT); }
		if (clt) console.timeEnd('control');

		if (clt) console.time('accelerate');
		for (const id in gD.entities) { if (gD.entities[id].accelerate) gD.entities[id].accelerate(dT); }
		if (clt) console.timeEnd('accelerate');

		if (clt) console.time('move');
		for (const id in gD.entities) { if (gD.entities[id].move) gD.entities[id].move(dT); }
		if (clt) console.timeEnd('move');

		if (clt) console.time('sense');
		for (const id in gD.entities) { if (gD.entities[id].sense) gD.entities[id].sense(dT); }
		if (clt) console.timeEnd('sense');

		while (queue[0]) {
			queue[0](currTick, dT);
			queue.shift();
		}
		
		if (env.isBrowser()) {
			SkyCanvasService.renderEntities();
	 	}

	 	const cld = false;
	 	if (cld){
	 		console.log(GDS);
	 	}

		const clp = true;
		if (clp){
			for (const id in gD.entities) { console.log(GDS.data.entities[id].p); }
		}

	}

	let timeout = TicksCalcService.timeTillNext()+1; // come in 1ms 'late' so it's definitely in the past.
	if (clt) console.log('timeout: ',timeout);
	setTimeout(doTick,timeout);




}