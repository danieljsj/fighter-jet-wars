
const ticksPerSecond = 60; // this is the same as the maximum browser refresh rate, meaning that in smooth flow, 1 tick : 1 repaint . I was tempted to go with 100fps for rounding reasons, but I think we can declare all the actual game values in ticks per second either hardcoded-ly or at a one-time-init-func.


let MathService = require('./MathService');








class TickService {

	constructor(){
		
	}

	getFloat(){
		return this.msToTicks(
			(new Date()).getTime();
		);		
	}

	getLatest(){
		return Math.floor(
			this.getFloat()
		);
	}

	msToTicks(ms){
		return (ms/1000)*ticksPerSecond;
	}



	perSToPerTickRoundedTo(rate, graduation){
		graduation = graduation || 1;
		
	}

}
module.exports = new TickService();