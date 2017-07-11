'use strict';

let TicksCalcS = require('../../../TicksCalcS');

let S_T 	= TicksCalcS.sToRoundedTicks			.bind(TicksCalcS);
let pS_rpT 	= TicksCalcS.perSToPerTickRoundedTo 	.bind(TicksCalcS);

let FighterBaseAtts = {

	// durations (ticks)
	laserRefreshTime	: S_T(0.5),	// s
	respawnTime			: S_T(0.0), // s

	// rates (/tick)
	engineAccel  		: pS_rpT(55,  10e-3), 	// afterburnerAccel in pixels per second^2
	afterburnerAccel 	: pS_rpT(102, 10e-2), 	// afterburnerAccel in pixels per second^2
	bodyDrag	 		: pS_rpT(0.2, 10e-4), 	// base coefficient of loss of velocity per second
	brakesDrag 			: pS_rpT(0.4, 10e-4), 	// brakes coefficient of loss of velocity per second
	turnRate	 		: pS_rpT(1.8, 10e-4), 	// turn rate in radians per second

	// pixels
	range				: 999999999999999999999999, // px
	bodyHeight			: 32,	// px // these could be in a common file, but then again maybe we want them to render them one way and simulate another; so fine to leave separate between frontend and backend
	bodyWidth			: 32,	// px

}

//////////

module.exports = FighterBaseAtts;