//== Entity > Flyer > Plane > 
//======================== C O M P U T E R ========================//

//Subclass
function Comp() { 
	// Superclass stuff builds this
	Plane.apply(this);  // THIS IS SO YOU GET X AND Y GENERATED NOW AND INDEPENDENTLY.
	// OTHER BUILDER FUNCS WOULD GO HERE BUT THEY WONT FOR NOW.
}; 			

Comp.prototype = Object.create(Plane.prototype); 	// THIS IS SO YOU GET FUNCTIONS.
Comp.prototype.constructor = Comp; 				// WHY DO I NEED THIS? (TRY WITHOUT...)






// -=-=-=-=-=-=- COMPUTERS -=-=-=-=-=-=- //

var comp1 = Object.create(Comp);

comp1.image = {
	src:'images/plane-mean-red.png',
	height:32,
	width:32,
}