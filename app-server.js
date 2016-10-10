require('log-timestamp');

const SimServ = require('./services/SimulationServiceNEW');      // start sim first to show that sim won't explode if game data is false or empty

const GD = require('./services/models/components/nulls/GD');

const GameDataInitiationService = require('./services/env/server/GameDataInitiationService');

////////



const mainSim = new SimServ.Simulation({gD: new GD()}); 


mainSim.start();

GameDataInitiationService.initiate(mainSim); // eventually we'll want to get smarter about how we do this; track ticks of player joins, etc.





// the server must be the only source for what -- for what I'll call "world controls". players have "player controls" which control individual units, but there are controls the "world" issues, like controls of where a player starts.

// if there's no data, and if you're the server, you need to make up a bunch of data. OR, during dev, you make it up anyways.

// what's the "source info" that only a server can create?
// -- where a player starts (or does the player enter that manually?)
