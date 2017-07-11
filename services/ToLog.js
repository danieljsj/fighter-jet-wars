'use strict';

class ToLog {

	constructor() {

		/////// UNCOMMENT DESIRED TRUES:

		this.playerGen = true;
		// this.env = true;


		// this.snapshotsAll = true;
		// this.snapshotsAllFull = true;
		
		this.rewind = true;

		// this.p = true;
		this.pIntervalS = 1;
		// this.time = true;
		// this.ticks = true;
		// this.gD = true;

		
		// // // io stuff:

		this.command = true;
		this.commandFull = true;
		this.commandTimes = true;
		this.commandSuccess = true;
		// this.readingCommands = true; // pretty bloated...

		// this.serverSkippedTick = true;
		// this.serverSkippedTickTimes = true;
		// this.serverSkippedTickSuccess = true;

		this.serverSnapshot = true;
		this.serverSnapshotTimes = true;
		this.serverSnapshotSuccess = true;	

	}

}

module.exports = new ToLog();