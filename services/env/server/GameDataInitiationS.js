'use strict';

const FirebaseRefS = require('../../FirebaseRefS');
const params = require('../../ParamsS').params;

const Fighter = require('../../models/Fighter');
const Blimp = require('../../models/Blimp');

const ToLog = require('../../ToLog');

let ref;

function initiate(sim){

	FirebaseRefS.initThen(function(){
		ref = FirebaseRefS.ref;
		addPlayerAndDefaultUnits({user: false}, sim);
		listenToFbUserAdds(sim);
	});

}

function listenToFbUserAdds(sim){
	// 1 user player for every registered user (regardless of whether logged in or not) -- their planes will run on AI.

	ref.child('users').on('child_added', function(ss, prevChildId){
		var user = { // TODO: MAKE THIS BE A REAL MODEL...
			name: ss.val().name,
			id: ss.key
		};
		if(ToLog.playerGen) console.log('found/added user '+user.id);
		addPlayerAndDefaultUnits({user:user},sim); ////////hmm. looks like the player contains the user object completely. Which I guess makes sense. User is outside the game, player is the game object. it's 1:1 or 1:0, so user, within the scope of a game, really is just a property of a player.
	});

}



function addPlayerAndDefaultUnits(opts, sim){
	opts = opts || {};
	opts.user = opts.user || false;

	var playerRef = ref.child('players').push(); // node-client generates the key syncly.
	var player = {
		id: playerRef.key,
		user: opts.user,
	};
	sim.gD.players[player.id] = player;
	if (opts.user){
		sim.gD.users[opts.user.id] = opts.user
	}
	console.log('added player ',player);

	var entityQuantities = {
		'fighter': (opts.user ? params.fightersPerNewUserPlayer : params.fightersPerNewNonuserPlayer ),
		'blimp': (opts.user ? params.blimpsPerNewUserPlayer : params.blimpsPerNewNonuserPlayer ),
	}
	if(ToLog.playerGen) console.log(entityQuantities);
	createEntitiesForPlayer(entityQuantities,player,sim);
}



// this one maybe should be common too.... just like CommandsReadingS? Well, maybe... but when a BROWSER starts, it should start by asking the server for all existing stuff... and then do a subscribe for only followups. Perhaps the code for new adds is available in common as well, but specific to the browser vs. backend is some code that differentiates what happens at startup. I.e. there's an "AddPlayer" func that fires both server and browser for new players... it just happens that the server will run it for a whole batch of users, whereas the browser will, on startup, read a snapshot from the server, not batch the fb users.

function createEntitiesForPlayer(entityQuantities, player, sim){
	var playerEntityTypeConstructors = { // note; some entities cannot be spawned directly for players, but must be spawned for fighters, etc. (i.e. lasers, missiles) ... however, I don't yet want to divide things out into Units, Projectiles, because in case of Missiles, you may want to control them directly, so for now I'm keeping it flat in Models.
		'fighter': Fighter,
		'blimp': Blimp, // COMING SOON!
	};
	for (var entityTypeName in entityQuantities){
		for (var i = 0; i < entityQuantities[entityTypeName]; i++) {
			
			var entityRef = ref.child('entities').push();

			var entity = new playerEntityTypeConstructors[entityTypeName]({
				id: entityRef.key,
				// fbRef: entityRef, // I don't think we need to store the fbRef since FB won't store actual entities.
				player: player,
				// playerId: player.id,
			});

			sim.gD.entities[entity.id] = entity;
			if(ToLog.playerGen) console.log('saved entity '+entity);
		}
	}
}


module.exports = {
	initiate:initiate
};