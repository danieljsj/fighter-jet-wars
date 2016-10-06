'use strict';
// FOR CONVERTING TO REACT: this would be a dispatcher for the intake of things, and a store for the things.


const env = require('./env');


const CommandsService = require('./io/CommandsService');
const ServerSkippedTicksService = require('./io/ServerSkippedTicksService');
const ServerSnapshotsService = require('./io/ServerSnapshotsService');

const params = require('./GameParamsService').params;


if (env.isClient()){
	var SnapshotRetrievalService = require('./SnapshotRetrievalService');
}

/////////////////////////

const serv = {
	latestServerSnapshot: null,
	serverSkippedTicks: {}, // if you ARE the server, this is a log of your own skips. might as well keep them; better to only ever skip ticsk, never un-skip them... because if you do happen to be re-simulating, you're already going to be behind! also, un-skipping them would just create more work for the clients as they re-simulate to accommodate the change. NOTE: this also means that servers must be uniquely able to write to this node for a given game/server.
	ticksCommands: {},
	
	ticksUnitAdditions: {},
	ticksUnitRemovals: {},

	addServerSnapshotCallback: addServerSnapshotCallback,

	addServerTickSkippedCallback: addServerTickSkippedCallback,

	addCommandAddedCallback: addCommandAddedCallback,
	addCommandChangedCallback: addCommandChangedCallback,
}

/////////////////////////



CommandsService.addCommandAddedCallback(function intakeAddedCommand(cmd){
	if (!serv.ticksCommands[cmd.tick]) serv.ticksCommands[cmd.tick] = {};
	serv.ticksCommands[cmd.tick][cmd.id] = cmd;
	_commandAddedCallbacks.forEach(function(cb){ /// might need to break this back out because in a switch, things are invalidated back to the older of the 2 commands
		cb(cmd);
	});
});

CommandsService.addCommandChangedCallback(function intakeChangedCommand(cmd){
	if ( (!serv.ticksCommands[cmd.tick]) || (!serv.ticksCommands[cmd.tick][cmd.id]) ){
		// the tick has changed!
		const cmdDupeTick = findCmdDupeTick(cmd);
		delete serv.ticksCommands[cmdDupeTick][cmd.id];
		cmd.setLocalFormerTick(cmdDupeTick);
		_commandChangedCallbacks.forEach(function(cb){
			cb(cmd);
		});

	} else {
		// serv.ticksCommands[cmd.tick][cmd.id] = cmd; // overwrite the old command
		// no need to do that, though!
	}
}); function findCmdDupeTick(cmd){
	const targetCmdId = cmd.id || cmd;
	for(const tickStr in serv.ticksCommands){
		for(const cmdId in serv.ticksCommands[tickStr]){
			if (cmdId == targetCmdId){
				return parseInt(tickStr);
			}
		}
	}
}

ServerSkippedTicksService.addServerSkippedTickAddedCallback(function intakeServerSkippedTick(sst){
	serv.serverSkippedTicks[sst.tick] = true;
	_serverSkippedTicksCallbacks.forEach(function(cb){
		cb(sst);
	});
});


ServerSnapshotsService.addServerSnapshotCallback(function intakeServerSnapshot(sss){
	serv.latestServerSnapshot = sss;
	_serverSnapshotCallbacks.forEach(function(cb){
		cb(sss);
	});
});















CommandsService.startReading();

ServerSkippedTicksService.startReading();

ServerSnapshotsService.startReading();








// flux has some ways to get at this without crazy big register methods and varnames... I should use it. but for now I just want to solve hard logic problems instead of architecture philosophy/optimizaton.
const _serverSnapshotCallbacks = [];
function addServerSnapshotCallback(fn){
	_serverSnapshotCallbacks.push(fn);
}


const _serverTickSkippedCallbacks = [];
function addServerTickSkippedCallback(fn){
	_serverTickSkippedCallbacks.push(fn);
}


const _commandAddedCallbacks = [];
function addCommandAddedCallback(fn){
	_commandAddedCallbacks.push(fn);
}

const _commandChangedCallbacks = [];
function addCommandChangedCallback(fn){
	_commandChangedCallbacks.push(fn);
}




module.exports = serv;