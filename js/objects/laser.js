
//== Entity > Flyer >
//======================== L A S E R ========================//



//Subclass
function Laser(shooter) { 
	// Superclass stuff builds this
	Flyer.apply(this);  // THIS IS SO YOU GET X AND Y GENERATED NOW AND INDEPENDENTLY.
	// OTHER BUILDER FUNCS WOULD GO HERE BUT THEY WONT FOR NOW.

	// Image
	this.image = {
		src:'images/laser.png',
		height:32,
		width:32,
	}

	this.body = {
		width:32,
		height:16,
	}

	// Permanent attributes
	this.atts = {
		baseAccel  	: 0, 	// afterburnerAccel in pixels per second
		baseDrag	: 0.8, 	// base coefficient of loss of velocity per second
		launchSpeed	: 700, 	// launch speed in pixels per ssecond
	}



	// Startup Sequence
	this.shooter = shooter;

			
	this.p.speed 			= this.shooter.p.speed + this.atts.launchSpeed; // movement in pixels per second
	this.p.direction 		= this.shooter.p.direction;
	this.p.x 				= this.shooter.p.x;
	this.p.y 				= this.shooter.p.y;

	// take a head-start move times as much as you so you don't blow up your owner. 
	this.move( this.body.width/2 + this.shooter.body.width/2, true ); // true means supplied as distance

	// this.move(.3);  

	

	// Lasers don't need their own registry function, because their shooter creates them directly into the registry

}; 			

Laser.prototype = Object.create(Flyer.prototype); 	// THIS IS SO YOU GET FUNCTIONS.
Laser.prototype.constructor = Laser; 				// WHY DO I NEED THIS? (TRY WITHOUT...) // WOULDNT THIS BE CONFLICTING? Since we're saying who the prototype is, if multiple things have the same prototype, wouldln't they override one another here?






Laser.prototype.collide = function(otherObject){
	this.shooter.stats.killCount++;
	unset(this);
	for ( var registry in registries ) {
		registry.clean();
	}
};