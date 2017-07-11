'use strict';
// FOR CONVERTING TO REACT: this would be a dispatcher for the intake of things, and a store for the things.


const env = require('./env');


const CommandsService = require('./io/CommandsService');
const ServerSkippedTicksService = require('./io/ServerSkippedTicksService');
const ServerSnapshotsService = require('./io/ServerSnapshotsService');

const TicksCalcService = require('./TicksCalcService');

const params = require('./GameParamsService').params;


if (env.isClient()){
	// ...?
}

/////////////////////////

const serv = {
	latestServerSnapshot: null,
	serverSkippedTicks: {}, // if you ARE the server, this is a log of your own skips. might as well keep them; better to only ever skip ticsk, never un-skip them... because if you do happen to be re-simulating, you're already going to be behind! also, un-skipping them would just create more work for the clients as they re-simulate to accommodate the change. NOTE: this also means that servers must be uniquely able to write to this node for a given game/server.
	ticksCommands: {},
	
	ticksUnitAdditions: {},
	ticksUnitRemovals: {},

	addServerSnapshotCb: addServerSnapshotCb,

	addServerTickSkippedCb: addServerTickSkippedCb,

	addCommandAddedCb: addCommandAddedCb,
	addCommandChangedCb: addCommandChangedCb,
}

/////////////////////////



CommandsService.addCommandAddedCb(function intakeAddedCommand(cmd){
	if (!serv.ticksCommands[cmd.tick]) serv.ticksCommands[cmd.tick] = {};
	serv.ticksCommands[cmd.tick][cmd.id] = cmd; 
	_commandAddedCbs.forEach(function(cb){ /// might need to break this back out because in a switch, things are invalidated back to the older of the 2 commands
		cb(cmd);
	});
	deleteAncientCommands();
});

CommandsService.addCommandChangedCb(function intakeChangedCommand(cmd){
	if ( (!serv.ticksCommands[cmd.tick]) || (!serv.ticksCommands[cmd.tick][cmd.id]) ){
		// the tick has changed!
		const cmdDupeTick = findCmdDupeTick(cmd);
		console.log('cmdDupeTick',cmdDupeTick); 
		if (cmdDupeTick){
			delete serv.ticksCommands[cmdDupeTick][cmd.id]; //////// THIS WAS GIVING SOMETHING ABOUT CONVERTING NULL TO OBJ
			cmd.setFormerTick(cmdDupeTick);
		}
		_commandChangedCbs.forEach(function(cb){
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

ServerSkippedTicksService.addServerSkippedTickAddedCb(function intakeServerSkippedTick(sst){
	serv.serverSkippedTicks[sst.tick] = true;
	_serverSkippedTicksCbs.forEach(function(cb){
		cb(sst);
	});
});


ServerSnapshotsService.addServerSnapshotCb(function intakeServerSnapshot(sss){
	serv.latestServerSnapshot = sss;
	_serverSnapshotCbs.forEach(function(cb){
		cb(sss);
	});
});






function deleteAncientCommands(){
	for (var tickStr in serv.ticksCommands){

		const cmdsTick = Number(tickStr);
		const anciencyTick = (TicksCalcService.next() - params.ticksPerServerSnapshot - params.commandsStorageCushionTicks);

		if ( cmdsTick < anciencyTick ) {
			console.log(cmdsTick + ' is less than ' + anciencyTick + ' by ' + anciencyTick - cmdsTick + ' ticks');
			// throw '...';
			delete serv.ticksCommands[tickStr];

		}
	}
}








CommandsService.startReading();

ServerSkippedTicksService.startReading();

ServerSnapshotsService.startReading();








// flux has some ways to get at this without crazy big register methods and varnames... I should use it. but for now I just want to solve hard logic problems instead of architecture philosophy/optimizaton.
const _serverSnapshotCbs = [];
function addServerSnapshotCb(fn){
	_serverSnapshotCbs.push(fn);
}


const _serverTickSkippedCbs = [];
function addServerTickSkippedCb(fn){
	_serverTickSkippedCbs.push(fn);
}


const _commandAddedCbs = [];
function addCommandAddedCb(fn){
	_commandAddedCbs.push(fn);
}

const _commandChangedCbs = [];
function addCommandChangedCb(fn){
	_commandChangedCbs.push(fn);
}




module.exports = serv;