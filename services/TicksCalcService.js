'use strict';

const ticksPerSecond = require('./ParamsService').params.ticksPerSecond;

///// SIDE-IDEA: stream of ticks is published like this: tickNum: ticksPerTick. as server load grows it will be like this 11111111020202020202003003003003003

// const ticksPerS = 4; // FOR DEBUGGING


let MathService = require('./MathService');

function now(){	return (new Date()).getTime() }



class TicksCalcService { ///// FOR USE ONLY IN THE SIMULATION SERVICE! BUT ITS FOR BOTH FRONT AND BACK SO I'M KEEPING IT HERE; IF I WERE A REALLY COOL PROGRAMMER WORKING ON A PROJECT WITH LOTS OF PEOPLE I WOULD FIGURE OUT A GOOD WAY TO KEEP THIS CLEARLY FOR USE ONLY BY THOSE SERVICES

	/// I guess these could be converted to properties via a constructor... low priority. save some cycles. mostly only used once per tick, I think. actually it's nice to keep as funcs so nothing outside can modify anything stored.
	ticksPerS(){
		return ticksPerSecond;
	} // this is the same as the maximum browser refresh rate, meaning that in smooth flow, 1 tick : 1 repaint . I was tempted to go with 100fps for rounding reasons, but I think we can declare all the actual game values in ticks per second either hardcoded-ly or at a one-time-init-func.
	ticksPerMs(){
		return this.ticksPerS() / 1000;
	}
	msPerTick(){
		return 1/this.ticksPerMs();
	}
	sPerTick(){
		return 1/this.ticksPerS();
	}
	

	float(){
		return this.msToTicks(now()); // otherwise ticks is too big for our array
	}
	latest(){
		return Math.floor(
			this.float()
		);
	}

	next(){
		return this.latest()+1;
	}
	nextTime(){
		return Math.ceil(this.next()*this.msPerTick()); // ceil to aim high so that when we come back from our 'timeout', the latest tick is barely in the past.
	}
	timeTillNext(){
		return this.nextTime()-now();
	}

	msToRoundedTicks(ms){
		return Math.round(this.msToTicks(ms));
	}
	sToRoundedTicks(s){
		return Math.round(this.sToTicks(s));
	}


	msToTicks(ms){
		return ms*this.ticksPerMs();
	}
	sToTicks(s){
		return s*this.ticksPerS();
	}


	perSToPerTickRoundedTo(rate, graduation){
		return MathService.roundTo(this.perSToPerTick(rate),graduation);
	}
	perSToPerTick(pS){
		return pS*this.sPerTick();
	}

}
module.exports = new TicksCalcService();