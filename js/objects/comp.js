//== Entity > Flyer > Plane > 
//======================== C O M P U T E R ========================//

//Subclass
function Comp() { 
	// Superclass stuff builds this
	Plane.apply(this);  // THIS IS SO YOU GET X AND Y GENERATED NOW AND INDEPENDENTLY.
	
	this.thoughts = {};

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

Comp.prototype.behaviors = {
	targetNearestPlayer: function(){
		var nearestFoeDist = Infinity;
		for (var i = registries.players.length - 1; i >= 0; i--) {
			var player = registries.players[i];
			if (distBtwObs(player,this) < nearestFoeDist){
				this.thoughts.target = player;
			}
		};
		this.thoughts.targetAngularOffset = null;
	}
	// ,targetLeastRotationallyOffsetPlayer = function(){
	// 	var nearestFoeDist = Infinity;
	// 	for (var i = registries.players.length - 1; i >= 0; i--) {
	// 		var player = registries.players[i];
	// 		if (distBtwObs(player,this) < nearestFoeDist){
	// 			var updatedTarget = player;
	// 		}
	// 	};
	// },
}

Comp.prototype.control = function(){  // Eventually, these could be bundled into hooks just like init is bundled.

	var behavior = this.thoughts.currentBehavior;
	var target = this.thoughts.target;
	var offset = this.thoughts.targetAngularOffset

	behavior();

	if ( ! offset ) {
		offset = angularOffsetFromMeToOb( this, target );
	}

	
	// Afterburner
	if (false) { this.ctrls.afterburning = true; } else { this.ctrls.afterburning = false; }

	// Brakes
	if (false) { this.ctrls.braking = true; } else { this.ctrls.braking = false; }

	// Turn Left
	if (0 < offset) { this.ctrls.turning = 1; } else { this.ctrls.turning = 0; }

	// Turn Right
	if (0 > offset) { this.ctrls.turning -= 1; } else { }

	// Fire
	if ( (Math.PI/8) > Math.abs(offset) ) { this.ctrls.tryingToFire = true; } else { this.ctrls.tryingToFire = false; }

}







// -=-=-=-=-=-=- COMPUTERS -=-=-=-=-=-=- //

var comp1 = Object.create(Comp);

comp1.image = {
	src:'images/plane-mean-red.png',
	height:32,
	width:32,
}

var comp2 = Object.create(Comp);

comp2.image = {
	src:'images/plane-mean-red.png',
	height:32,
	width:32,
}