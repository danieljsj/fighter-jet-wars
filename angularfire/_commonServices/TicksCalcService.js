
const ticksPerSecond = 60; // this is the same as the maximum browser refresh rate, meaning that in smooth flow, 1 tick : 1 repaint . I was tempted to go with 100fps for rounding reasons, but I think we can declare all the actual game values in ticks per second either hardcoded-ly or at a one-time-init-func.

let MathService = require('./MathService');





class TicksCalcService {

	getLatest(){
		return Math.floor(
			this.getFloat()
		);
	}
	getFloat(){
		return this.msToTicks(
			(new Date()).getTime();
		);		
	}


	msToRoundedTicks(ms){
		return Math.round(this.msToTicks(s));
	}
	sToRoundedTicks(s){
		return Math.round(this.sToTicks(s));
	}


	msToTicks(ms){
		return (ms/1000)*ticksPerSecond;
	}
	sToTicks(s){
		return s*ticksPerSecond;
	}


	perSToPerTickRoundedTo(rate, graduation){
		return MathService.roundTo(rate,graduation);
	}

}
module.exports = new TicksCalcService();