var UnitsDataService = require('UnitsDataService');

var GameDataService = require('./GameDataService');
var GameParamsService = require('./GameParamsService');
var gD = GameParamsService.data;

module.exports.simulate = simulate; function simulate(ref) {

	GameDataService.initDataThen(startTicks);  // todo: i want a better middleware stack or something

}


var lastTickStartTime = null;

function watchControls(){ // THIS WILL GO INTO USERS OR MAYBE PLAYERS. OOOOH RIGHT. WE WANT THEM TO BE ABLE TO HAVE MULTIPLE WINDOWS OPEN SO THEY CAN SEE MULTIPLE PLANES FIGHTING! "ENTER" KEY TO TOGGLE AI. WHEN CONTROLLING, ARROWS SWITCH WEAPONS; WHEN AI, ARROWS SWITCH SCRIPTS, WSAD SWITCHES TARGETS OR SOMETHING. BUT THAT'S TREATS FOR ANOTHER DAY. I CAN SAFELY ASSUME ONE USER ONE WINDOW FOR NOW... JUST KEEPING THE SHENANIGANS IN MIND!
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

	// flexible "duck" interfacing/typing-- if (entity.quack) 		entity.quack();
	gD.entities.forEach(function(entity){ 	if (entity.control) 	entity.control(dT);  		});
	gD.entities.forEach(function(entity){	if (entity.accelerate) 	entity.accelerate(dT);  	});
	gD.entities.forEach(function(entity){	if (entity.move) 		entity.move(dT);  		});
	gD.entities.forEach(function(entity){	if (entity.sense) 		entity.sense(dT);  		});
}