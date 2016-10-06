// stuff below is duplicated in AgentCreatorService... for use by PlayerMovementsService
// job of THIS file is to create a bunch of player movements(type=join) at server boot.
// TODO: if a browser gets data that is older than the last (authoritative) serversnapshot, ignore it. irrelevant. overridden.










// 'use strict';

// // NOTE: FIREBASE DATA OTHER THAN USERS CAN BE COMPLETELY EPHEMORAL; WE CAN PERSIST INTO AND REBOOT FROM MONGO IF WE WANT. OR NOT. SO ACTUALLY WE SHOULD PROBABLY DELETE ALL THE GAMEDATA OUT OF FIREBASE. FIREBASE CAN HAVE A "GAME" TOP-LEVEL-CHILD, WHICH WE DELETE UPON SERVER RESTART.

// var FirebaseRefService = require('../../FirebaseRefService');
// var GameParamsService = require('../../GameParamsService');

// var Fighter = require('../../models/Fighter.js');
// var Blimp = require('../../models/Blimp.js');

// const GD = require('../../models/components/nulls/GD');

// ///////////

// let ref;

// function(cb){

// 	const gD = new GD();

// 	FirebaseRefService.initThen(function(){
// 		ref = FirebaseRefService.ref;
// 		addPlayerAndDefaultUnits({user:false});
// 		addPlayerAndDefaultUnits({user:false});
// 		listenToFbUserAdds();
// 		cb();
// 	});

// }


 
// ///////////
 



// // PLAN: user-adds go in io, as tick-bound events.	







// // NOTE: these two might should be common...

// function listenToFbUserAdds(){
// 	// 1 user player for every registered user (regardless of whether logged in or not) -- their planes will run on AI.

// 	ref.child('users').on('child_added', function(ss, prevChildId){
// 		var user = { // TODO: MAKE THIS BE A REAL MODEL...
// 			name: ss.val().name,
// 			id: ss.key
// 		};
// 		GDS.data.users[user.id] = user;
// 		console.log('found/added user '+user.id);
// 		addPlayerAndDefaultUnits({user:user});
// 	});

// }

// function addPlayerAndDefaultUnits(params){
// 	params = params || {};
// 	params.user = params.user || false;

// 	var playerRef = ref.child('players').push(); // node-client generates the key syncly.
// 	var player = {
// 		id: playerRef.key,
// 		user: params.user,
// 	};
// 	GDS.data.players[player.id] = player;
// 	console.log('added player '+player.id);

// 	var entityQuantities = {
// 		'fighter': (params.user ? GameParamsService.params.fightersPerNewUserPlayer : GameParamsService.params.fightersPerNewNonuserPlayer ),
// 		'blimp': (params.user ? GameParamsService.params.blimpsPerNewUserPlayer : GameParamsService.params.blimpsPerNewNonuserPlayer ),
// 	}
// 	createEntitiesForPlayer(entityQuantities,player);
// }



// // this one maybe should be common too.... just like CommandsReadingService? Well, maybe... but when a BROWSER starts, it should start by asking the server for all existing stuff... and then do a subscribe for only followups. Perhaps the code for new adds is available in common as well, but specific to the browser vs. backend is some code that differentiates what happens at startup. I.e. there's an "AddPlayer" func that fires both server and browser for new players... it just happens that the server will run it for a whole batch of users, whereas the browser will, on startup, read a snapshot from the server, not batch the fb users.

// function createEntitiesForPlayer(entityQuantities, player){
// 	var playerEntityTypeConstructors = { // note; some entities cannot be spawned directly for players, but must be spawned for fighters, etc. (i.e. lasers, missiles) ... however, I don't yet want to divide things out into Units, Projectiles, because in case of Missiles, you may want to control them directly, so for now I'm keeping it flat in Models.
// 		'fighter': Fighter,
// 		'blimp': Blimp, // COMING SOON!
// 	};
// 	for (var entityTypeName in entityQuantities){
// 		for (var i = 0; i < entityQuantities[entityTypeName]; i++) {
			
// 			var entityRef = ref.child('entities').push();

// 			var entity = new playerEntityTypeConstructors[entityTypeName]({
// 				id: entityRef.key,
// 				// fbRef: entityRef, // I don't think we need to store the fbRef since FB won't store actual entities.
// 				player: player,
// 				// playerId: player.id,
// 			});

// 			GDS.data.entities[entity.id] = entity;

// 		}
// 	}
// }
