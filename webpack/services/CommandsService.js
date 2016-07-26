'use strict';

const FirebaseRefService = require('./FirebaseRefService');
const GDS = require('./GameDataService');
const GameParamsService = require('./GameParamsService');
const TicksCalcService = require('./TicksCalcService');

const knownCommandsByTick = {};

////////////////////////////////////////////////////

let commandsRef;

FirebaseRefService.initThen(function(){
	commandsRef = FirebaseRefService.ref.child('commands');
});

// SENDING //////////////////////////////////////////

const lasts = {
  'timestamp':0,
  'fore':null,
  'back':null,
  'left':null,
  'right':null,
  'tryFire':null
}


function send(key,val){


	const INTERVAL = 10000;

	if (!commandsRef) return;
	//////// 1-second refresh is for DEBUGGING!!!
  	if ((lasts[key] != val) || (lasts['timestamp'] < new Date().getTime() - INTERVAL)){
    
    lasts['timestamp'] = new Date().getTime();

    lasts[key] = val;

    var entities = GDS.data.entities;
    
    let id;
    for (const idYup in entities){
      id = idYup;
      break;
    }

    const cmd = {
      eId: id,
      key: key,
      val: val,
      bT: (new Date()).getTime(),
      sT: require('firebase').database.ServerValue.TIMESTAMP,
    };

    console.log('sending cmd: ',cmd);

    // console.log('commandsRef',commandsRef);

    commandsRef.push().set(cmd, function onComplete(error) {
	  if (error) throw("cmd could not be saved." + error);
	  console.log('cmd successfully sent');
	});

    /////////// HOLY SMOKES... this works when I do it from the root js file... but when I do it from here in sendCommand, it doesn't do it! (but it does in the browser...)
	const ref = FirebaseRefService.ref;
	console.log('about to make baz:buz (i.e. starting to test sending data in to firebase...)');
	const testRef = ref.child('test/controlBazBuz/'+(require('./env').isBrowser() ? 'browser' : 'node'));
	testRef.push().set({baz:'buz'}, function onComplete(err){
		if (err) throw err;
		console.log('baz set to buz (i.e. test send was successful)');
	});



  }

}

// READING //////////////////////////////////////////

let commandCallback;

function startReading(){

	FirebaseRefService.initThen(function(){
		commandsRef = FirebaseRefService.ref.child('commands');
		commandsRef.limitToLast(1).on('child_added', function(commandSnapshot){

			const cmd = commandSnapshot.val();

			console.log('received cmd: ',cmd);

								// temporary:
								var entity = GDS.data.entities[cmd.eId];
								if (entity) entity.controls[cmd.key] = cmd.val;

			cmd.tick = getCommandTick(cmd);

			// up and coming:
			if (commandCallback) {
				commandCallback(cmd); // more wise, involving ticks
			}

		});
	});

}

// setting the .tick in common is good because server and browser should definitely agree! just hopefully the server's rendering is enough behind (and I bet it could gauge itself to prevent excessive backtracking-needing) that the tick of a command the server is receiving is always ahead of what the server is simulating, so no backtracking.


function getCommandTick(cmd){
	return Math.max(
		TicksCalcService.msToRoundedTicks(cmd.bT),
		// rule: the command happened when you pressed the button, unless that's longer ago than when your command arrived to firebase minus the max allowed lag time, in which case your command registers as being the max amount before arrival to server allowed.
		TicksCalcService.msToRoundedTicks(cmd.sT)-GameParamsService.params.maxCommandLagTicks
	);
}

function config(opts){
	commandCallback = opts.commandCallback || function(cmd){};
}





//////////////////////////////////////////


module.exports = {
	config: config,
	startReading: startReading,
	send: send,
}