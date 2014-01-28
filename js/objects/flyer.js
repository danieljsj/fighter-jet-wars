
//== Entity >
//======================== F L Y E R ========================//


//Subclass
function Flyer() { 
	// Superclass stuff builds this
	Entity.apply(this);  // THIS IS SO YOU GET X AND Y GENERATED NOW AND INDEPENDENTLY.
	// OTHER BUILDER FUNCS WOULD GO HERE BUT THEY WONT FOR NOW.
}; 			

Flyer.prototype = Object.create(Entity.prototype); 	// THIS IS SO YOU GET FUNCTIONS.
Flyer.prototype.constructor = Flyer; 				// WHY DO I NEED THIS? (TRY WITHOUT...)


Flyer.prototype.move = function(dT){
	var D = this.p.speed * dT;
	this.p.y += Math.sin(this.p.direction) * D;
	this.p.x += Math.cos(this.p.direction) * D;
}

