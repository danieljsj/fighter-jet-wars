

// DISTANCE

function distBtwPts(pt1,pt2){
	return Math.pow(
		(
			Math.pow( pt1.x-pt2.x, 2 ) +
			Math.pow( pt1.y-pt2.y, 2 )
		),
		.5
	);
}

function distBtwObs(ob1,ob2){
	return distBtwPts(
		{x: ob1.p.x, y:ob1.p.y},
		{x: ob2.p.x, y:ob2.p.y}
	);
}


// ANGLE

function directionFromMeToOb(me,ob){

	var tan = (me.p.y-ob.p.y) / (me.p.x-ob.p.x);
	var arctan = Math.atan(tan);
									console.info("arctan: "+arctan);

	if (ob.p.x > me.p.x && ob.p.y > me.p.y)
		var direction = arctan;
	if (ob.p.x < me.p.x && ob.p.y > me.p.y)
		var direction = Math.PI + arctan;
	if (ob.p.x < me.p.x && ob.p.y < me.p.y)
		var direction = -Math.PI + arctan;
	if (ob.p.x > me.p.x && ob.p.y < me.p.y)
		var direction = arctan;

	me.directionToOb = direction;
	return direction;
}

function angularOffsetFromMeToOb(me,ob){


	var direction = directionFromMeToOb(me,ob);

	var offset = direction - me.p.direction;

	var lineHeight = 32, i = 0;

	if ( offset > Math.PI ) { offset -= 2 * Math.PI; }
	if ( offset < -Math.PI ) { offset += 2 * Math.PI; }

	return offset;

}

		// var Flyer = {};
		// var Plane = {};
		// var Comp = {};
		// var Entity = {};

		///////TESTS

		var TestPlaneA = {p: {x:0,	y:0,	direction:Math.PI/4} };
		var TestPlaneB = {p: {x:-10,y:10,	direction:Math.PI/4} };
		var TestPlaneC = {p: {x:-10,y:-10,	direction:Math.PI/4} };

		// DIRECTION TESTS

		sensingTests = [
			{
				name: "directionFromMeToOb_____(-10,10)",
				value: directionFromMeToOb( TestPlaneA,TestPlaneB ),
				expected: Math.PI * 3/4
			},
			{
				name: "angularOffsetFromMeToOb_(-10,10)",
				value: angularOffsetFromMeToOb( TestPlaneA,TestPlaneB ),
				expected: Math.PI * 1/2
			},
			{
				name: "directionFromMeToOb_____(-10,-10)",
				value: directionFromMeToOb( TestPlaneA,TestPlaneC ),
				expected: Math.PI * -3/4
			},
			{
				name: "angularOffsetFromMeToOb_(-10,-10)",
				value: angularOffsetFromMeToOb( TestPlaneA,TestPlaneC ),
				expected: Math.PI * -1
			},
			{
				name: "directionFromMeToOb_____(10,10)",
				value: directionFromMeToOb( TestPlaneC,TestPlaneA ),
				expected: Math.PI * 1/4
			},
			{
				name: "angularOffsetFromMeToOb_(10,10)",
				value: angularOffsetFromMeToOb( TestPlaneC,TestPlaneA ),
				expected: Math.PI * 0
			},			
			{
				name: "directionFromMeToOb_____(10,-10)",
				value: directionFromMeToOb( TestPlaneB,TestPlaneA ),
				expected: Math.PI * -1/4
			},
			{
				name: "angularOffsetFromMeToOb_(10,-10)",
				value: angularOffsetFromMeToOb( TestPlaneB,TestPlaneA ),
				expected: Math.PI * -1/2
			}			
			// ,{
			// 	name: "distBtwObs",
			// 	value: distBtwObs( TestPlaneA,TestPlaneB ),
			// 	expected: Math.pow(200,0.5)
			// }
		];
		for (var i = 0; i < sensingTests.length; i++) {
			var test = sensingTests[i];
			console.info("TEST: succeeded: "+(test.expected == test.value)+"	name:"+test.name+"	value: "+test.value+"	expected:"+test.expected);
		};


// TOUCHING

function pointTouchingRectangleOb(pt,ob){

	if (
		   pt.x <= ( ob.p.x + ob.body.width/2  ) //Am I left of right of bldg body?
		&& pt.x >= ( ob.p.x - ob.body.width/2  ) //Am I right of left of bldg body?
		&& pt.y <= ( ob.p.y + ob.body.height/2 ) //Am I below top of bldg body?
		&& pt.y >= ( ob.p.y - ob.body.height/2 ) //Am I above bottom of bldg body?
	) { 
		return true;
	} else 	{ 
		return false;
	}
}


/*
function pointTouchingTriangleOb(pt,ob){

	// COMING SOON / NOAH MATH HERE

}
*/




/// SENSING SPECIFIC TO FLYER & PLANE

Flyer.prototype.getPoints = function(){
	var points = [
		{
			x: this.p.x,
			y: this.p.y
		}
	]

	return points;
}


/*
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
*/




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






