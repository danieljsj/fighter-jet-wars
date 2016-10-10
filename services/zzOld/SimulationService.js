'use strict';
const ToLog = require('./ToLog');

const env = require('./env');

const GDS = require('./GameDataService');

const params = require('./GameParamsService').params;
const TicksCalcService = require('./TicksCalcService');
const CommandsService = require('./io/CommandsService');

if (env.isBrowser()) {
	var SkyCanvasService = require('./env/browser/SkyCanvasService');
}

//////////////

module.exports = {
	start: start,
	afterTick: afterTick,
}

function start(ref) {
	CommandsService.startReading();
	startTicks();
}

function afterTick(cb){
	queue.push(cb);
}

//////////////

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




function WHERE_DO_I_GO_____(){

	while (queue[0]) { // currently used for: snapshot requests; do this after a tick.
		queue[0](currTick, dT);
		queue.shift();
	}
	
	if (env.isBrowser()) {
		SkyCanvasService.renderEntities();
 	}

	let timeout = TicksCalcService.timeTillNext()+1; // come in 1ms 'late' so it's definitely in the past.
	if (ToLog.time) console.log('timeout: ',timeout);
	setTimeout(doTick,timeout);

}







