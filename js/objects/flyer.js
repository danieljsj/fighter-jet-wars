
//== Entity >
//======================== F L Y E R ========================//


//Subclass
function Flyer() { 
	// Superclass stuff builds this
	Entity.apply(this);  // THIS IS SO YOU GET X AND Y GENERATED NOW AND INDEPENDENTLY.
	// OTHER BUILDER FUNCS WOULD GO HERE BUT THEY WONT FOR NOW.


	// THIS IS REALLY JUST FOR PLANE BUT FOR NOW WE'LL USE IT FOR ALL FLYERS
	this.body = {
		width: 32,
		height: 32
	}
}; 			

Flyer.prototype = Object.create(Entity.prototype); 	// THIS IS SO YOU GET FUNCTIONS.
Flyer.prototype.constructor = Flyer; 				// WHY DO I NEED THIS? (TRY WITHOUT...)


Flyer.prototype.move = function(amt, distanceSpecified){

	if ( distanceSpecified ) 	{ var dist = amt;	} 
	else 						{ var dist = amt * this.p.speed; }

	this.p.y += Math.sin(this.p.direction) * dist;
	this.p.x += Math.cos(this.p.direction) * dist;

	if (!this.stats.rangeLeft ) { 
		this.stats.rangeLeft = this.atts.range; 
	}
	this.stats.rangeLeft -= dist;

	if ( this instanceof Laser && (this.stats.rangeLeft < 0) ) {
		this.remove();
	}
};



