'use strict';

///// SIDE-IDEA: stream of ticks is published like this: tickNum: ticksPerTick. as server load grows it will be like this 11111111020202020202003003003003003

// const ticksPerS = 60; // this is the same as the maximum browser refresh rate, meaning that in smooth flow, 1 tick : 1 repaint . I was tempted to go with 100fps for rounding reasons, but I think we can declare all the actual game values in ticks per second either hardcoded-ly or at a one-time-init-func.
const ticksPerS = 2; // this is the same as the maximum browser refresh rate, meaning that in smooth flow, 1 tick : 1 repaint . I was tempted to go with 100fps for rounding reasons, but I think we can declare all the actual game values in ticks per second either hardcoded-ly or at a one-time-init-func.
const ticksPerMs = ticksPerS / 1000;

const sPerTick = 1/ticksPerS;
const msPerTick = 1/ticksPerMs;

let MathService = require('./MathService');

function now(){	return (new Date()).getTime() }



class TicksCalcService { ///// FOR USE ONLY IN THE SIMULATION SERVICE! BUT ITS FOR BOTH FRONT AND BACK SO I'M KEEPING IT HERE; IF I WERE A REALLY COOL PROGRAMMER WORKING ON A PROJECT WITH LOTS OF PEOPLE I WOULD FIGURE OUT A GOOD WAY TO KEEP THIS CLEARLY FOR USE ONLY BY THOSE SERVICES

	next(){
		return this.latest()+1;
	}
	latest(){
		return Math.floor(
			this.float()
		);
	}
	float(){
		return this.msToTicks(now());		
	}

	timeTillNext(){
		return this.nextTime()-now();
	}
	nextTime(){
		return Math.ceil(this.next()*msPerTick); // ceil to aim high so that when we come back from our 'timeout', the latest tick is barely in the past.
	}


	msToRoundedTicks(ms){
		return Math.round(this.msToTicks(s));
	}
	sToRoundedTicks(s){
		return Math.round(this.sToTicks(s));
	}


	msToTicks(ms){
		return ms*ticksPerMs;
	}
	sToTicks(s){
		return s*ticksPerS;
	}


	perSToPerTickRoundedTo(rate, graduation){
		return MathService.roundTo(this.perSToPerTick(rate),graduation);
	}
	perSToPerTick(pS){
		return pS*sPerTick;
	}

}
module.exports = new TicksCalcService();