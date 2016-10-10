'use strict';

class ToLog {

	constructor() {


		////// ALL, AS FALSES:

		this.snapshot = false;
		this.snapshotFull = false;

		this.p = false;
		this.time = false;
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

		this.playerMovement = false;
		this.playerMovementTimes = false;
		this.playerMovementSuccess = false;



		/////// UNCOMMENT DESIRED TRUES:

		// this.snapshot = true;
		// this.snapshotFull = true;

		// this.p = true;
		// this.time = true;
		// this.gD = true;

		
		// // io stuff:

		// this.command = true;
		// this.commandTimes = true;
		// this.commandSuccess = true;

		// this.serverSkippedTick = true;
		// this.serverSkippedTickTimes = true;
		this.serverSkippedTickSuccess = true;

		// this.playerMovement = true;
		// this.playerMovementTimes = true;
		this.playerMovementSuccess = true;

		this.serverSnapshot = true;
		this.serverSnapshotTimes = true;
		this.serverSnapshotSuccess = true;	

	}

}

module.exports = new ToLog();