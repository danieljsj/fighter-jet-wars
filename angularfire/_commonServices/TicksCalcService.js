
///// SIDE-IDEA: stream of ticks is published like this: tickNum: ticksPerTick. as server load grows it will be like this 11111111020202020202003003003003003

const ticksPerS = 60; // this is the same as the maximum browser refresh rate, meaning that in smooth flow, 1 tick : 1 repaint . I was tempted to go with 100fps for rounding reasons, but I think we can declare all the actual game values in ticks per second either hardcoded-ly or at a one-time-init-func.
const ticksPerMs = ticksPerS / 1000;

const sPerTick = 1/ticksPerS;
const msPerTick = 1/ticksPerMs;

let MathService = require('./MathService');

function now(){	return (new Date()).getTime() }



class TicksCalcService {

	latest(){
		return Math.floor(
			this.float()
		);
	}
	float(){
		return this.msToTicks(now());		
	}

	msTillNext(){
		return this.nextTime()-now();
	}
	nextTime(){
		return Math.ceil(this.latest()*msPerTick); // ceil to aim high so that when we come back from our 'timeout', the last tick is barely in the past.
	}


	msToRoundTicks(ms){
		return Math.round(this.msToTicks(s));
	}
	sToRoundTicks(s){
		return Math.round(this.sToTicks(s));
	}


	msToTicks(ms){
		return ms*ticksPerMs;
	}
	sToTicks(s){
		return s*ticksPerS;
	}


	perSToPerTickRoundedTo(rate, graduation){
		return MathService.roundTo(rate,graduation);
	}

}
module.exports = new TicksCalcService();