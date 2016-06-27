'use strict';

let TicksCalcService = require('../../../TicksCalcService');

/////////////

function move(dT, px){

	//  /\/\/\  OPTION TO MOVE A SET NUMBER OF PIXELS; USEFUL FOR INITIAL MOVEMENT AWAY FROM AIRCRAFT HULLS  /\/\/\ //
	if (false && px) { 
		var dist = px;	
	} else { 
		var dist = TicksCalcService.perSToPerTickRoundedTo(this.p.speed,10e-2); // speed is per-second!
	}


	//  /\/\/\  CORE MOVEMENT:  /\/\/\ //
	this.p.y += Math.sin(this.p.direction) * dist;
	this.p.x += Math.cos(this.p.direction) * dist;


	//  /\/\/\  RANGE:  /\/\/\ // // COMING SOON TO A LASER NEAR YOU

	// // TODO: Move this into some kind of spawn() function... and clean it up...
	// if (!this.stats.rangeLeft ) { 
	// 	this.stats.rangeLeft = this.atts.range; 
	// }
	// this.stats.rangeLeft -= dist;
	// // TODO: No need to limit this to just lasers...
	// if ( this.remove && (this.stats.rangeLeft < 0) ) {
	// 	this.remove();
	// }
}


/////////////

module.exports = {
	move: move
}