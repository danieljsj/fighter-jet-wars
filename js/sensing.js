










function pointTouchingRectangleOb(pt,ob){

	if (
		   pt.x <= (ob.p.x + ob.body.width/2  ) //Am I left of right of bldg body?
		&& pt.x >= (ob.p.x - ob.body.width/2  ) //Am I right of left of bldg body?
		&& pt.y <= (ob.p.y + ob.body.height/2 ) //Am I below top of bldg body?
		&& pt.y >= (ob.p.y - ob.body.height/2 ) //Am I above bottom of bldg body?
	) { 
		return true;
	} else 	{ 
		return false;
	}
}


/* function pointTouchingTriangleOb(pt,ob){


	// NOAH MATH IS NEEDED HERE!!!!!!!!!
	if (
		   pt.x <= (ob.p.x + ob.body.width/2  ) //Am I left of right of bldg body?/// NOAH MATH HERE LATER // will use direction of ob
		&& pt.x >= (ob.p.x - ob.body.width/2  ) //Am I right of left of bldg body?/// NOAH MATH HERE LATER // will use direction of ob
		&& pt.y <= (ob.p.y + ob.body.height/2 ) //Am I below top of bldg body?/// NOAH MATH HERE LATER // will use direction of ob
		&& pt.y >= (ob.p.y - ob.body.height/2 ) //Am I above bottom of bldg body? /// NOAH MATH HERE LATER // will use direction of ob
	) { 
		return true;
	} else 	{ 
		return false;
	}
} */


Flyer.prototype.getPoints = function(){
	var points = [
		{
			x: this.p.x,
			y: this.p.y
		}
	]

	return points;
}


/*Plane.getPoints = function(){

	var points = [
		// Nose Point
		{
			x: this.body.width/2 * Math.sin(this.direction),
			y: NOAH_MATH_HERE
		},
		// Left wing point
		{
			x: NOAH_MATH_HERE,
			y: NOAH_MATH_HERE
		},
		// Right wing point
		{
			x: NOAH_MATH_HERE,
			y: NOAH_MATH_HERE
		},
	];

	return points;

};*/




Flyer.prototype.sense = function(){
	
	var points = this.getPoints();

	for ( var i=0; i<registries.entities.length; i++){

		if ( ! (registries.entities[i] === this)  ){

			if ( pointsTouchingThing(points, registries.entities[i]) ) {

				registries.entities[i]	.collide( this );
				this					.collide( registries.entities[i] );
				return;

			}

		}

	}

}


function pointsTouchingThing(points, thing){
	for ( var i=0; i<points.length; i++){
		if ( thing.touching(points[i]) ){
			return true;
		}
	}
	return false
}



// It's occurring to me that we should have the drawing have an offset, not the touching. because touching will get called more times per frame than drawing.


/* Building.prototype.touching = function(point){

	pointTouchingRectangleOb(point,this); // again, I'm not sure what the "this" is here, (is it going to be the protoype? I don't think so...) but it should be the object in question

} */

Plane.prototype.touching = function(point){

	return pointTouchingRectangleOb(point,this); // again, I'm not sure what the "this" is here, (is it going to be the protoype? I don't think so...) but it should be the object in question

}


Entity.prototype.touching = function(point){
	
	return pointTouchingRectangleOb(point,this); // again, I'm not sure what the "this" is here, (is it going to be the protoype? I don't think so...) but it should be the object in question

}