so... 

I can offer a "max latency cushion".

Server's "authoritative" universe is a tick that is simulated a latency-cushion BEHIND true current time's tick.







JUST WATCHED NETCODE THING.

OTHERS IN PAST, ME 
They let other players lag into the past; the player renders ahead of other players in time.

They favor the shooter, meaning you can shoot the time-trailing appearance of your foe, and score a hit

PRO: Others don't flicker.

CON: server must run hit detection against past vesions; i.e. this laser exists in the past, so it is hitting past versions of targets.

Weapon-by-weapon de

Ultimately, there are whole teams of people dedicated to solving this stuff in really fancy ways. I'm not interested in that right now.







What's my fix?

okay.

clients and server subscribe to same firebase controls-feed.

clients render to "current tick" as new past-timestamped controls arrive, with a "max lag", based

commands are sent with 1)clientTime and 2)serverTime, from which can be derived eventTime ;


	on('child_added', function(commandSnapshot){

		const cmd = commandSnapshot.val();

		const earliestAllowableTime = cmd.serverTime - maxLag;
		
		cmd.eventTime = Math.max(earliestAllowableTime, cmd.clientTime);

		cmd.tick = Math.round(cmd.eventTime/framesPerSecond);

		latestValidTick = Math.min(cmd.tick, latestValidTick);

		clearMatchingLocalTempCommand(cmd); 
			// WAIT... this isn't needed because the command is already stored... BUT I wonder when it gets its timestamp added.... 

	});

		now, this could run cpus at 100%, but basically we let simulation (from latest valid tick snapshot to now) and rendering (and maybe localsnapshotting) go through synchronously; afterwards the JS call stack will have collected any incoming commands. these will invalidate the latest ticks.
			If desired, the incoming commands could be buffered so that we're only invalidating a pile of old ticks (and thus having to re-simulate) every, say, 4-10 ticks. But usually I don't think this will be needed; usually I think we will be able to sim everything; sim is easy compared to rendering,network,etc., I think.





authoritative server version is behind.

sends authoritative snapshots (which also invalidate a pile of old ticks for a browser)