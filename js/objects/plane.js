
//== Entity > Flyer > 
//======================== P L A N E ========================//

function Plane() { 
	Flyer.apply(this);  // THIS IS SO YOU GET X AND Y GENERATED NOW AND INDEPENDENTLY.

	// Image
	this.image = {
		src:'images/plane-friendly-gray.png',
		height:32,
		width:32,
	}

	// Permanent attributes
	this.atts = {
		baseAccel  			: 50, 	// afterburnerAccel in pixels per second^2
		afterburnerAccel 	: 100, 	// afterburnerAccel in pixels per second^2
		baseDrag	 		: 0.2, 	// base coefficient of loss of velocity per second
		brakesDrag 			: 0.4, 	// brakes coefficient of loss of velocity per second
		turnRate	 		: 3, 	// turn rate in radians per second
		laserRefreshTime	: .5	// 
	};

	this.inits.push({
		handle: 'setStartingStatuses',
		order: 0,
		func: function(){

			//alert("setStartingStatuses");
			// set Physical statuses
			this.p.speed 		= this.atts.baseAccel / this.atts.baseDrag; // pixels per second
			this.p.x 			= Math.random()*canvas.width;
			this.p.y 			= Math.random()*canvas.height;
			this.p.direction 	= Math.atan( 
				( 
					canvas.height / 2  -  this.p.y 
				)/(
					canvas.width  / 2  -  this.p.x
				)
			);

			// set Controls statuses
			this.ctrls.turning 		= 0;
			this.ctrls.afterburning	= false;
			this.ctrls.braking 		= false;
			this.ctrls.tryingToFire = false;

			// Set Various statuses
			this.stats.laserRefreshLeft = 0;

		},
	});
}; 			
Plane.prototype = Object.create(Flyer.prototype); 	// THIS IS SO YOU GET FUNCTIONS.
Plane.prototype.constructor = Plane; 				// WHY DO I NEED THIS? (TRY WITHOUT...)


Plane.prototype.accelerate = function(dT){ /// NOTE: You'd need to create a separate bundler for stuff that needs dT...
	// -- DRAG -- //

	// Base Drag
	this.p.speed -= this.p.speed * this.atts.baseDrag * dT;

	// Braking Drag
	if (this.ctrls.braking){
		this.p.speed -= this.p.speed * this.atts.brakesDrag * dT;
	}	


	// -- THRUST -- //

	// Base Thrust
	this.p.speed += this.atts.baseAccel * dT;

	// Afterburning Thrust
	if (this.ctrls.afterburning) {
		this.p.speed += this.atts.afterburnerAccel * dT;
	}


	// -- TURNING -- //f

	// Turning
	this.p.direction -= this.ctrls.turning * this.atts.turnRate * dT; // why negative?

	// Reign in the radians
	if (this.p.direction >   3.141592654*2) {
		this.p.direction -=  3.141592654*2;
	}
	if (this.p.direction <  -3.141592654*2) {
		this.p.direction -= -3.141592654*2;
	}

}


Plane.prototype.otherPlaneTurnFuncs = function(dT){
	if (this.stats.laserRefreshLeft > 0){
		this.stats.laserRefreshLeft -= dT;
	}
}

Plane.prototype.communicate = function(){ // Eventually, these could be bundled into hooks just like init is bundled.

	// Fire Laser
	if ( this.ctrls.tryingToFire && this.stats.laserRefreshLeft <= 0 ){

		// Laser refresh
		this.stats.laserRefreshLeft = this.atts.laserRefreshTime;

		// Create laser
		var newLaser = new Laser(this); 
		console.log( newLaser );

		// Create a laser, record its position in the array
		registry.lasers.push( newLaser );

		// init
		newLaser.init();
	}

}
