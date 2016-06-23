var UnitsDataService = require('UnitsDataService');


module.exports.simulate = simulate;


function simulate(ref) {

	var units = UnitsDataService.getAll();

	units.forEach(function(unit){ 	unit.control(); 	});
	units.forEach(function(unit){ 	unit.accelerate(); 	});
	units.forEach(function(unit){ 	unit.move(); 		});
	units.forEach(function(unit){ 	unit.sense(); 		});

	var p1Ref = ref.child("players/1");

	var p1 = {
		controls: {
			turningRight:false,
			turningLeft:false,
			accellerating:false,
			braking:false
		},
		p: {
			x:0,
			y:0,
			direction:0,
			speed:0
		},
	};

	p1Ref.on('value', function(p1Snapshot){
		p1.controls = p1Snapshot.val().controls;
		p1.p = p1Snapshot.val().p;
	});


	var lastTime = new Date().getTime();
	var p1LastTimeJSON = JSON.stringify(p1);
	var p1LastTime = JSON.parse(p1LastTimeJSON);
	setInterval(function(){

		var newTime = new Date().getTime();
		var dT = (newTime - lastTime) / 1000;
		lastTime = newTime;

		if (p1.p && p1.controls){
			p1.p.direction += dT * (p1.controls.turningRight - p1.controls.turningLeft);
			p1.p.speed += dT * (p1.controls.accellerating - p1.controls.braking); // needs some renames here...
			console.log('dT',dT);
			p1.p.x += Math.cos(p1.p.direction) * p1.p.speed * dT;
			p1.p.y += Math.sin(p1.p.direction) * p1.p.speed * dT;

			var newJSON = JSON.stringify(p1.p);

			if ( newJSON !== p1LastTimeJSON ) {
				// console.log(newJSON + '!==' + p1LastTimeJSON);
				console.log('sending '+ newJSON);
				p1Ref.child('p').set(p1.p);
				p1LastTimeJSON = newJSON;
				p1LastTime = JSON.parse(p1LastTimeJSON);
			}
		}

	},1);


}