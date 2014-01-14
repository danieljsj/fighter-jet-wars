
// isn't there a shinier way to do this assigning? that I made all preciousfancycute with a for loop and stuff at the top of 2014-01-14objects.js?

obGenFuncs['Plane'].push(function(ob){

		// -- THRUST -- //

		// Base Thrust
		ob.p.speed += ob.atts.baseAccel * dT;

		// Afterburning Thrust
		if (ob.afterburning) {
			ob.p.speed += ob.atts.afterburnerAccel * dT;
		}


		// -- DRAG -- //

		// Base Drag
		ob.p.speed *= 1-(ob.atts.baseDrag * dT);

		// Braking Drag
		if (ob.ctrls.braking){
			ob.p.speed *= 1-(ob.atts.brakesDrag * dT);
		}	


		// -- TURNING -- //

		// Turning
		ob.p.direction -= ob.ctrls.turning * ob.atts.turnRate * dT; // why negative?

		// Reign in the radians
		if (ob.p.direction > 3.141592654*2) {
			ob.p.direction -=3.141592654*2;
		}
		if (ob.p.direction < -3.141592654*2) {
			ob.p.direction -=-3.141592654*2;
		}


});