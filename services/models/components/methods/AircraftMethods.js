'use strict';

/////////////

function accelerate(dT){

	// -- DRAG -- //

	// Base Drag
	this.p.speed -= this.p.speed * this.atts.bodyDrag * dT;

	// Braking Drag
	if (this.controls.back){
		this.p.speed -= this.p.speed * this.atts.brakesDrag * dT;
	}	


	// -- THRUST -- //

	// Base Thrust
	this.p.speed += this.atts.engineAccel * dT;

	// Afterburning Thrust
	if (this.controls.fore) {
		this.p.speed += this.atts.afterburnerAccel * dT;
	}


	// -- TURNING -- //

	// Turning
	if (this.controls.left || this.controls.right){
		this.p.direction += (this.controls.right - this.controls.left ) * this.atts.turnRate * dT;

		// Reign in the radians
		if (this.p.direction >   3.141592654*2) {
			this.p.direction -=  3.141592654*2;
		}
		if (this.p.direction <  -3.141592654*2) {
			this.p.direction -= -3.141592654*2;
		}
	}

	for (const k in this.p){
		if (isNaN(this.p[k])){
			console.warn( k+' is NaN in p: ',this.p );
			console.warn('controls: ',this.controls);
			throw 'NaN p prop';
		}
	}
}


/////////////

module.exports = {
	accelerate: accelerate
}