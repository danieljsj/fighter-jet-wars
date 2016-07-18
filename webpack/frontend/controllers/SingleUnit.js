'use strict';

// PLAN: in player (or, temporarily, user), we save a "controlledEntityId --- I may have even written that somewhere; then entities check if their user is controlling them, and if not, they run their ais. you can have multiple windows open, multiple computers. also maybe a browser-instance can be kept; a 'console' object, and if a console is viewing a unit, then it skips over that unit when you toggle other consoles. actually that's goofy because sometimes you could infinite loop if you added a new console. better to let them select any."
// UNLESS we want you to be able to have your user account controlling multiple... but I think that's perhaps cheating because then we're giving the user-controlled powerup to multiple planes on your team, allowing more fame points for your team. Which maybe is cool. An option for another day.


console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");


// const LeafletMapService = require('../services/LeafletMapService');
const SkyCanvasService = require('../services/SkyCanvasService');
const KeyboardControlsService = require('../services/KeyboardControlsService');
const FirebaseRefService = require('../services/FirebaseRefService');
const SimService = require('../services/SimService');

const SnapshotRetrievalService = require('../services/SnapshotRetrievalService');
const SnapshotService = require('../../common/services/SnapshotService');
const GameDataService = require('../services/GameDataService');
const CommandsReadingService = require('../../common/services/CommandsReadingService');

FirebaseRefService.initThen(function(){

	// SINGLE UNIT VIEW-MODEL:

	// LeafletMapService.initMap('leafletMap');
	SkyCanvasService.initCanvas('skyCanvas');
	SnapshotRetrievalService.retrieveThen(function(snapshot){
		console.log('snapshot',snapshot);
		GameDataService.data = SnapshotService.makeGameDataFromSnapshot(snapshot);
		SimService.start();
		CommandsReadingService.start();
	});

	// SINGLE UNIT CONTROL:

	KeyboardControlsService.start();

});