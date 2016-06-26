'use strict';

var GameDataService = require('./GameDataService');
var gD = GameDataService.data;

var GameParamsService = require('../../_commonServices/GameParamsService');

var BroadcastingService = require('./BroadcastingService');


//////////////


module.exports.start = start; 

function start(ref) {

	startTicks(); // ticks start first; app spins fine on empty data tree.
	GameDataService.start(); // data streams in gracefully

}

//////////////

var lastTickStartTime = null;

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
	process.stdout.write('\x1B[2J'); // clear console
	

	var dT = getDt();

	console.log('dT: ',dT);

	// flexible "duck" interfacing/typing-- if (entity.quack) 		entity.quack();
	console.time('control');
	gD.entities.forEach(function(entity){ 	if (entity.control) 	entity.control(dT);  	});
	console.timeEnd('control');

	console.time('accelerate');
	gD.entities.forEach(function(entity){	if (entity.accelerate) 	entity.accelerate(dT);  });
	console.timeEnd('accelerate');

	console.time('move');
	gD.entities.forEach(function(entity){	if (entity.move) 		entity.move(dT);  		});
	console.timeEnd('move');

	console.time('sense');
	gD.entities.forEach(function(entity){	if (entity.sense) 		entity.sense(dT);  		});
	console.timeEnd('sense');

	console.time('fbPublish');
	gD.entities.forEach(function(entity){	if (entity.fbPublish)	entity.fbPublish(dT);  	});
	console.timeEnd('fbPublish');

	// disabling for now; this will be used when people first join the game
	console.time('sendUpdate');
	BroadcastingService.sendUpdate();
	console.timeEnd('sendUpdate');


}






function watchControls(){ // THIS WILL GO INTO USERS OR MAYBE PLAYERS. OOOOH RIGHT. WE WANT THEM TO BE ABLE TO HAVE MULTIPLE WINDOWS OPEN SO THEY CAN SEE MULTIPLE PLANES FIGHTING! "ENTER" KEY TO TOGGLE AI. WHEN CONTROLLING, ARROWS SWITCH WEAPONS; WHEN AI, ARROWS SWITCH SCRIPTS, WSAD SWITCHES TARGETS OR SOMETHING. BUT THAT'S TREATS FOR ANOTHER DAY. I CAN SAFELY ASSUME ONE USER ONE WINDOW FOR NOW... JUST KEEPING THE SHENANIGANS IN MIND!
	// p1Ref.on('value', function(p1Snapshot){
	// 	p1.controls = p1Snapshot.val().controls;
	// 	p1.p = p1Snapshot.val().p;
	// });
}