'use strict';

var GameDataService = require('./GameDataService');
var gD = GameDataService.data;

var GameParamsService = require('../../_commonServices/GameParamsService');


//////////////


module.exports.start = start; 

function start(ref) {

	startTicks(); // ticks start first; app spins fine on empty data tree.
	GameDataService.start(); // data streams in gracefully

}

//////////////

// SWITCH TO USING ACTUAL TICKS:
// something like this, sort of;
//  Math.round((new Date()).getTime()/GameParamsService.params.ticksPerSecond); 

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

	var c = false;

	if (c) process.stdout.write('\x1B[2J'); // clear console
	

	var dT = getDt();

	if (c) console.log('dT: ',dT);

	// flexible "duck" interfacing/typing-- if (entity.quack) 		entity.quack();
	if (c) console.time('control');
	gD.entities.forEach(function(entity){ 	if (entity.control) 	entity.control(dT);  	});
	if (c) console.timeEnd('control');

	if (c) console.time('accelerate');
	gD.entities.forEach(function(entity){	if (entity.accelerate) 	entity.accelerate(dT);  });
	if (c) console.timeEnd('accelerate');

	if (c) console.time('move');
	gD.entities.forEach(function(entity){	if (entity.move) 		entity.move(dT);  		});
	if (c) console.timeEnd('move');

	if (c) console.time('sense');
	gD.entities.forEach(function(entity){	if (entity.sense) 		entity.sense(dT);  		});
	if (c) console.timeEnd('sense');

	if (c) console.time('fbPublish');
	gD.entities.forEach(function(entity){	if (entity.fbPublish)	entity.fbPublish(dT);  	});
	if (c) console.timeEnd('fbPublish');

}






function watchControls(){ // THIS WILL GO INTO USERS OR MAYBE PLAYERS. OOOOH RIGHT. WE WANT THEM TO BE ABLE TO HAVE MULTIPLE WINDOWS OPEN SO THEY CAN SEE MULTIPLE PLANES FIGHTING! "ENTER" KEY TO TOGGLE AI. WHEN CONTROLLING, ARROWS SWITCH WEAPONS; WHEN AI, ARROWS SWITCH SCRIPTS, WSAD SWITCHES TARGETS OR SOMETHING. BUT THAT'S TREATS FOR ANOTHER DAY. I CAN SAFELY ASSUME ONE USER ONE WINDOW FOR NOW... JUST KEEPING THE SHENANIGANS IN MIND!
	// p1Ref.on('value', function(p1Snapshot){
	// 	p1.controls = p1Snapshot.val().controls;
	// 	p1.p = p1Snapshot.val().p;
	// });
}