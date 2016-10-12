'use strict';

class ToLog {

	constructor() {

		/////// UNCOMMENT DESIRED TRUES:

		this.playerGen = true;
		// this.env = true;


		this.snapshot = true;
		this.snapshotFull = true;

		// this.p = true;
		// this.time = true;
		// this.ticks = true;
		// this.gD = true;

		
		// // // io stuff:

		this.command = true;
		// this.commandTimes = true;
		// this.commandSuccess = true;

		// this.serverSkippedTick = true;
		// this.serverSkippedTickTimes = true;
		// this.serverSkippedTickSuccess = true;

		// this.serverSnapshot = true;
		// this.serverSnapshotTimes = true;
		// this.serverSnapshotSuccess = true;	

	}

}

module.exports = new ToLog();