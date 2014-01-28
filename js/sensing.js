



function pointsTouchingOb( points, ob ) {
		
	// loop through the points submitted
	var l = points.length;
	for (i = 0; i < l; i++){

		// if the object says that any of the points are touching it, return true.
		if ( ob.touching(points[i])) {
			return true;
		}
	}
	// otherwise return false.
	return false;
}






function pointTouchingRectangleOb(pt,ob){
	// Am I touching a building?
	if (
		   pt.x <= (ob.x + ob.body.width/2  + ob.body.offsetX) //Am I left of right of bldg body?
		&& pt.x >= (ob.x - ob.body.width/2  + ob.body.offsetX) //Am I right of left of bldg body?
		&& pt.y <= (ob.y + ob.body.height/2 + ob.body.offsetY) //Am I below top of bldg body?
		&& pt.y >= (ob.y - ob.body.height/2 + ob.body.offsetY) //Am I above bottom of bldg body?
	) { 
		return true;
	} else 	{ 
		return false;
	}
}


function pointTouchingTriangleOb(pt,ob){
	// Am I touching a building?
	if (
		   pt.x <= (ob.x + ob.body.width/2  + ob.body.offsetX) //Am I left of right of bldg body?/// NOAH MATH HERE LATER // will use direction of ob
		&& pt.x >= (ob.x - ob.body.width/2  + ob.body.offsetX) //Am I right of left of bldg body?/// NOAH MATH HERE LATER // will use direction of ob
		&& pt.y <= (ob.y + ob.body.height/2 + ob.body.offsetY) //Am I below top of bldg body?/// NOAH MATH HERE LATER // will use direction of ob
		&& pt.y >= (ob.y - ob.body.height/2 + ob.body.offsetY) //Am I above bottom of bldg body? /// NOAH MATH HERE LATER // will use direction of ob
	) { 
		return true;
	} else 	{ 
		return false;
	}
}





Plane.getPoints = function(){

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

};

Laser.prototype.getPoints = function(){
	var points = [
		{
			x: this.p.x,
			y: this.p.y
		}
	]

	return points;
}




Flyer.prototype.senseEnvironment = function(){
	
	var points = Laser.prototype.getPoints();

	for ( var i=0; i<registry.entities.length; i++){

		if pointsTouchingThing(points, registry.entites[i]){

			registry.entities[i]	.getHit();
			this					.getHit();
			return;

		}

	}

}


function pointsTouchingThing(points, thing){
	for ( var i=0; i<points.length; i++){
		if ( registry.entites[i].touching(points[i])){
			return true;
		}
	}
	return false
}


// It's occurring to me that we should have the drawing have an offset, not the touching. because touching will get called more times per frame than drawing.


Building.prototype.touching = function(point){

	pointTouchingRectangleOb(point,this); // again, I'm not sure what the "this" is here, (is it going to be the protoype? I don't think so...) but it should be the object in question

}

Plane.prototype.touching = function(point){

	pointTouchingRectangleOb(point,this); // again, I'm not sure what the "this" is here, (is it going to be the protoype? I don't think so...) but it should be the object in question

}


Entity.prototype.touching = function(point){
	
	pointTouchingRectangleOb(point,this); // again, I'm not sure what the "this" is here, (is it going to be the protoype? I don't think so...) but it should be the object in question

}