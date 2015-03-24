//== Entity > Flyer > Plane > 
//======================== C O M P U T E R ========================//

//Subclass
function Comp() { 
	// Superclass stuff builds this
	Plane.apply(this);  // THIS IS SO YOU GET X AND Y GENERATED NOW AND INDEPENDENTLY.
	
	this.inits.push({
		handle: 'register',
		order: 200,
		func: function(){
			registries.comps.push(this);
		}
	});
}; 			

Comp.prototype = Object.create(Plane.prototype); 	// THIS IS SO YOU GET FUNCTIONS.
Comp.prototype.constructor = Comp; 				// WHY DO I NEED THIS? (TRY WITHOUT...)


Comp.prototype.control = function(){  // Eventually, these could be bundled into hooks just like init is bundled.

	// STILL WORKING ON THIS...
	// var Dx = player1.p.x - this.p.x;
	// var Dy = player1.p.y - this.p.y;
	
	// var directionToPlayer1 = Math.arctan(Dy/Dx);

}







// -=-=-=-=-=-=- COMPUTERS -=-=-=-=-=-=- //

var comp1 = Object.create(Comp);

comp1.image = {
	src:'images/plane-mean-red.png',
	height:32,
	width:32,
}