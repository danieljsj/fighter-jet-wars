'use strict';

const standardGraduation = 0.1;

const coss = [];
const sins = [];

class MathS {

	roundTo(float,graduation){
		return float; // DISABLES THIS WHOLE FUNCTION; I AM ANNOYED WITH DEALING WITH ROUNDING ATTEMPTS AT THE MOMENT;

		graduation = graduation || standardGraduation;
		return Math.round(float/graduation)*graduation;
	}







	// MAYBE DON'T MESS WITH THIS OPTIMIZATION JUNK:
	// 
	// // AND IF I DO, MAYBE USE THIS KIND OF ROUNDING SO IT DOESN'T SUFFER ROUNDING ERRORS: http://www.jacklmoore.com/notes/rounding-in-javascript/

	cos(theta){ 
		theta = this.roundTo(theta,10e-3); // OPTION TO OPTMIZE MORE: MAKE IT BE LIKE THIS: this lookup table requires that incoming theta be pre-rounded; i don't want to round them here because i don"t want to use extra cycles re-rounding things whose direction has not change!
		const cached = coss[theta];
		return cached || (coss[theta] = this.roundTo(Math.cos(theta),10e-3));
	}
	sin(theta){ 
		theta = this.roundTo(theta,10e-3); // OPTION TO OPTMIZE MORE: MAKE IT BE LIKE THIS: this lookup table requires that incoming theta be pre-rounded; i don't want to round them here because i don"t want to use extra cycles re-rounding things whose direction has not change!
		const cached = sins[theta];
		return cached || (sins[theta] = this.roundTo(Math.sin(theta),10e-3));
	}
	tan(theta){ 
		theta = this.roundTo(theta,10e-3); // OPTION TO OPTMIZE MORE: MAKE IT BE LIKE THIS: this lookup table requires that incoming theta be pre-rounded; i don't want to round them here because i don"t want to use extra cycles re-rounding things whose direction has not change!
		return this.sin(theta)/this.cos(theta);
	}

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

}

module.exports = new MathS();




