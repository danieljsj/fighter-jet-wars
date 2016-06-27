'use strict';

let GameDataService = require('./GameDataService');
let gD = GameDataService.data;

let GameParamsService = require('../../_commonServices/GameParamsService');
let TicksCalcService = require('../../_commonServices/TicksCalcService');


//////////////

module.exports = {
	start: start,
	afterTick: afterTick,
}

function start(ref) {

	startTicks(); // ticks start first; app spins fine on empty data tree.
	GameDataService.start(); // data streams in gracefully

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
	gD.entities.forEach(function(entity){ 	if (entity.control) 	entity.control(dT);  	});
	if (c) console.timeEnd('control');

	if (c) console.time('accelerate');
	gD.entities.forEach(function(entity){	if (entity.accelerate) 	entity.accelerate(dT);  });
	if (c) console.timeEnd('accelerate');

	if (c) console.time('move');
	gD.entities.forEach(function(entity){	if (entity.move) 		entity.move(dT);  		});
	if (c) console.timeEnd('move');

	if (c) console.time('sense');
	gD.entities.forEach(function(entity){	if (entity.sense) 		entity.sense(dT);  		});
	if (c) console.timeEnd('sense');

	if (c) console.time('fbPublish');
	gD.entities.forEach(function(entity){	if (entity.fbPublish)	entity.fbPublish(dT);  	});
	if (c) console.timeEnd('fbPublish');

	while (queue[0]) {
		queue[0]();
		queue.shift();
	}

	let timeout = TicksCalcService.timeTillNext()+1; // come in 1ms 'late' so it's definitely in the past.
	if (c) console.log('timeout: ',timeout);
	setTimeout(doTick,timeout);

}






function watchControls(){ // THIS WILL GO INTO USERS OR MAYBE PLAYERS. OOOOH RIGHT. WE WANT THEM TO BE ABLE TO HAVE MULTIPLE WINDOWS OPEN SO THEY CAN SEE MULTIPLE PLANES FIGHTING! "ENTER" KEY TO TOGGLE AI. WHEN CONTROLLING, ARROWS SWITCH WEAPONS; WHEN AI, ARROWS SWITCH SCRIPTS, WSAD SWITCHES TARGETS OR SOMETHING. BUT THAT'S TREATS FOR ANOTHER DAY. I CAN SAFELY ASSUME ONE USER ONE WINDOW FOR NOW... JUST KEEPING THE SHENANIGANS IN MIND!
	// p1Ref.on('value', function(p1Snapshot){
	// 	p1.controls = p1Snapshot.val().controls;
	// 	p1.p = p1Snapshot.val().p;
	// });
}