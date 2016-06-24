var UnitsDataService = require('UnitsDataService');

var GameDataService = require('./GameDataService');
var GameParamsService = require('./GameParamsService');

module.exports.simulate = simulate; function simulate(ref) {

	GameDataService.initDataThen(startTicks);  // todo: i want a better middleware stack or something

}


var lastTickStartTime = null;

function watchControls(){
	// p1Ref.on('value', function(p1Snapshot){
	// 	p1.controls = p1Snapshot.val().controls;
	// 	p1.p = p1Snapshot.val().p;
	// });
}

function startTicks(){
	lastTickStartTime = new Date().getTime();
	setInterval(gameTick, GameParamsService.params.tickIntervalMs);
}

function getDt(){
	var newTickStartTime = new Date().getTime();
	var dT = (newTickStartTime - lastTickStartTime) / 1000;
	lastTickStartTime = newTickStartTime;
	return dT;
}

function gameTick(){
	var dT = getDt();

	var flyers2dArr = GameDataService.getFlyers2dArr();

	flyers2dArr.forEach(function(fArr){fArr.forEach(function(flyer){
			flyer.control();
	});});
	flyers2dArr.forEach(function(fArr){fArr.forEach(function(flyer){
			flyer.accelerate();
	});});
	flyers2dArr.forEach(function(fArr){fArr.forEach(function(flyer){
			flyer.move();
	});});
	flyers2dArr.forEach(function(fArr){fArr.forEach(function(flyer){
			flyer.sense(); // THOUGHT: For this I'll eventually want to do crazy chunking so you're only sensing against people near you, and not against planes in russia... but I've already got the code working for this so I'll start with this.
	});});
}