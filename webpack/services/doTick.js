'use strict';
const ToLog = require('./ToLog');

function doTick(gD, dT, tickDoneCb){     

	// possible later thing: name. perhaps each gD has a name, like 'main_sim', 'ai_projection', etc.
	
	gD.tickStarted = gD.tickCompleted + dT;

	if (ToLog.time) console.log('dT: ',dT);

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

	gD.tickCompleted = gD.tickStarted;

	tickDoneCb();

}

module.exports = doTick;