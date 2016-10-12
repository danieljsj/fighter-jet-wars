'use strict';

class ToLog {

	constructor() {


		////// ALL, AS FALSES:

		this.playerGen = false;
		this.env = false;

		this.snapshot = false;
		this.snapshotFull = false;

		this.p = false;
		this.time = false;
		this.ticks = false;
		this.gD = false;


		// io stuff:

		this.command = false;
		this.commandTimes = false;
		this.commandSuccess = false;

		this.serverSkippedTick = false;
		this.serverSkippedTickTimes = false;
		this.serverSkippedTickSuccess = false;

		this.serverSnapshot = false;
		this.serverSnapshotTimes = false;
		this.serverSnapshotSuccess = false;	




		/////// UNCOMMENT DESIRED TRUES:

		this.playerGen = true;
		this.env = false;


		this.snapshot = true;
		this.snapshotFull = true;

		this.p = true;
		// this.time = true;
		// this.ticks = true;
		// this.gD = true;

		
		// // // io stuff:

		this.command = true;
		this.commandTimes = true;
		this.commandSuccess = true;

		// this.serverSkippedTick = true;
		// this.serverSkippedTickTimes = true;
		// this.serverSkippedTickSuccess = true;

		// this.serverSnapshot = true;
		// this.serverSnapshotTimes = true;
		// this.serverSnapshotSuccess = true;	

	}

}

module.exports = new ToLog();