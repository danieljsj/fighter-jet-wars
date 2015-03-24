

// DISTANCE

function distBtwPts(pt1,pt2){
	return (
		(pt1.x - pt2.x)^2
		+
		(pt1.y - pt2.y)^2
	)^.5;
}

function distBtwObs(ob1,ob2){
	return distBtwPts(
		{x: ob1.p.x, y:ob1.p.y},
		{x: ob2.p.x, y:ob2.p.y}
	);
}


// ANGLE

function directionFromMeToOb(me,ob){

	var arctan = Math.arctan(
		(me.p.y-ob.p.y)/
		(me.p.x-ob.p.x)
	);
	if (ob.p.x < me.p.x)
		var direction = arctan + Math.PI;
	else
		var direction = arctan;

	return direction;
}

function angularOffsetFromMeToOb(me,ob){

	var direction = directionFromMeToOb(me,ob);

	var offset = direction - me.p.direction;

	while ( Math.PI < offset ) { offset -= Math.PI; }
	while ( -Math.PI > offset ) { offset += Math.PI; }

	return offset;

}



// TOUCHING

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