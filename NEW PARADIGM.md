## Assumptions:

-- Too much to stream position data
-- Simulation takes *MUCH* less time than network requests (or rendering).
		I.e. client can always "re-simulate" based on intermittently cached local-snapshots when told about commands that happened in the past, and/or when given an updated server snapshot



## How to do it:

tick is like time; tick = round(time/60); things stored in ticks.

probably: web sockets; people connect and send commands straight in to server; server generates the tickStamp for them right then and there.
alternately: server works like clients; simulates but re-simulates... NOPE. server is standard tick-by-tick sim, no resimulation. otherwise it would be backing up ALL THE TIME.



## Capabilities for down the road

	PHYSICS:
		theoretically it might be cool if I kept the physics working so that things could simulate with a fixed function rather than tick-by-tick; but I think tick-by-tick will be fine; as mentioned it's easy to re-sim. ESPECIALLY if the browser isn't having to think for the AIs EXCEPT for the most basic AIs.

	ZONING: 
		when entering a zone, you're sent a snapshot, and you start streaming entrances.

	AI:
		A.1: individualistic, fixed: standard AI. we can calculate a plane like we calculate a missile.
		A.2: individualistic, scriptId; scripts public and saved;
		A.3: individualistic script, plus receiving a stream of published commands from an AI controller
		B.1: server-side; keeps AI scripts a secret; AIs issue per-entity rate-limited conntrols like players do. 
			--> Best experience, slightly more bandwidth, faster client-side simulation. BEST.


																											do I want to make games as a life goal? no but it's a good learning and job-hunting tool



