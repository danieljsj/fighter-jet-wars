'use strict';

module.exports = {
	params: {
		
		fightersPerNewUserPlayer: 1, /// COMEBACK:TODO:HOLY POOOPER SCOOPER -- IF I HAVE MULTIPLE UNITS, EVERYTHING HAPPENS FASTER! ALL THE MOVEMENT IS APPLYING TO ALL OF THEM!!!
		blimpsPerNewUserPlayer: 0,

		fightersPerNewNonuserPlayer: 1,
		blimpsPerNewNonuserPlayer: 0,

		ticksPerSecond: 60,

		ticksPerServerSnapshot: 60, // I think I liked this to be bigger (600) because each one was causing a jump... but to do that I needed things like making the local machines track the same initial inputs the server tracks and generate the same information from it so it's not waiting for server input; server is more of an occasional correction. but for now I want tighter connection.
		ticksPerLocalSnapshot: 3, // rationale: around half the distance into the past the average command will arrive; doesn't fire every frame but still refrains from making us have to use far-past snapshots when new commands arrive. I might end up discovering it makes way more sense to make this further in the past if I find that generating snapshots is way more work than resimulating stuff. I.e. allocations vs. cycles and setting.

		maxCommandLagTicks: 4,

		serverLagTicks: 8, // this maybe should be more tied in to maxCommandLagTicks...

		minimumRedundantCommandInterval: 2000,

		minimumReasonableRemoteLatency: 10, ////// local fake latency is coming in at -2 to +2ms... real latency from a server is being 30; 10 seems a reasonable divider.
		// deleteCommandsAfterTime: 10000, // COMING SOON! Currently just deletes all on startup...
	}
}