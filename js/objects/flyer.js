
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


Flyer.prototype.move = function(dT){

	this.p.y += Math.sin(this.p.direction) * this.p.speed * dT;
	this.p.x += Math.cos(this.p.direction) * this.p.speed * dT;

};

Flyer.prototype.getHit = function(){
	unset(this);
	for ( var registry in registries ) {
		registry.clean();
	}
};

