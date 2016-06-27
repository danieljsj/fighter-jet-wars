'use strict';

const standardGraduation = 0.1;

const coss = [];

class MathService {
	
	roundTo(float,graduation){
		graduation = graduation || standardGraduation;
		return Math.round(float/graduation)*graduation;
	}

	cos(theta){ // IMPORTANT! this lookup table requires that incoming theta be pre-rounded; i don't want to round them here because i don"t want to use extra cycles re-rounding things whose direction has not change!

		/*NOTES: 

		before cached-math:

		dT:  11
		control: 21ms
		accelerate: 13ms
		move: 39ms
		sense: 3ms
		fbPublish: 3ms

		after caching cos WAIT, NO... WHY DID IT CHANGE? I DIDN'T EVEN IMPLEMENT THE NEW FUNC...

		okay... well... if move time went away without me doing anything, then maybe it's time to work on other stuff...

		dT:  3
		control: 18ms
		accelerate: 1ms
		move: 3ms
		sense: 0ms
		fbPublish: 1ms



		*/
		const cached = coss[theta];
		return cached || (coss[theta] = this.RoundTo(Math.cos(theta),10e-2));
	}
}

module.exports = new MathService();




