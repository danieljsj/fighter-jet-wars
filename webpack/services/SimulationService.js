'use strict';
const ToLog = require('./ToLog');

const env = require('./env');

const GDS = require('./GameDataService');

const params = require('./GameParamsService').params;
const TicksCalcService = require('./TicksCalcService');
const CommandsService = require('./CommandsService');

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

function doTick(gD, tickDoneCb){
		
	let dT = getDt(gD.tick);

	if (ToLog.time) console.log('dT: ',dT);
	if (ToLog.time) console.log('gD.tick: ',gD.tick);


	if (ToLog.time) console.time('control');
	for (const id in gD.entities) { if (gD.entities[id].control) gD.entities[id].control(dT); }
	if (ToLog.time) console.timeEnd('control');

	if (ToLog.time) console.time('accelerate');
	for (const id in gD.entities) { if (gD.entities[id].accelerate) gD.entities[id].accelerate(dT); }
	if (ToLog.time) console.timeEnd('accelerate');

	if (ToLog.time) console.time('move');
	for (const id in gD.entities) { if (gD.entities[id].move) gD.entities[id].move(dT); }
	if (ToLog.time) console.timeEnd('move');

	if (ToLog.time) console.time('sense');
	for (const id in gD.entities) { if (gD.entities[id].sense) gD.entities[id].sense(dT); }
	if (ToLog.time) console.timeEnd('sense');

 	if (ToLog.gD) console.log(gD);

	if (ToLog.p){
		let i = 0;
		if (! (gD.tick % params.ticksPerSecond) ){
			for (const id in gD.entities) { 
				let p = GDS.data.entities[id].p; 

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

	tickDoneCb();

}

function WHERE_DO_I_GO_____(){
	
	while (queue[0]) {
		queue[0](currTick, dT);
		queue.shift();
	}
	
	if (env.isBrowser()) {
		SkyCanvasService.renderEntities();
 	}
}