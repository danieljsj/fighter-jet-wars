'use strict';

// NOTE: FIREBASE DATA OTHER THAN USERS CAN BE COMPLETELY EPHEMORAL; WE CAN PERSIST INTO AND REBOOT FROM MONGO IF WE WANT. OR NOT. SO ACTUALLY WE SHOULD PROBABLY DELETE ALL THE GAMEDATA OUT OF FIREBASE. FIREBASE CAN HAVE A "GAME" TOP-LEVEL-CHILD, WHICH WE DELETE UPON SERVER RESTART.

var FirebaseRefService = require('./FirebaseRefService');
var GameParamsService = require('./GameParamsService');

var Fighter = require('./models/Fighter.js');
var Blimp = require('./models/Blimp.js');



///////////



var gD = {
	users: [],
	players: [],
	entities: [],
	entitiesByType: {
		fighter: [],
		blimp: [],
		laser: [],
	},
};

var ref;

module.exports = {
	data: gD,
	start: start,
}

function start(){
	ref = FirebaseRefService.getRef(); if (!ref) throw "GameErr: FirebaseRefService has not initialized yet!";
	addPlayer({user:false});
	listenToFbUserAdds();
}



///////////



function listenToFbUserAdds(){
		
	// 1 user player for every registered user (regardless of whether logged in or not) -- their planes will run on AI.

	ref.child('users').on('child_added', function(ss, prevChildId){
		var user = { // TODO: MAKE THIS BE A REAL MODEL...
			name: ss.val().name,
			id: ss.key()
		};
		addPlayer({user:user});
	});

}




function addPlayer(params){
	params = params || {};
	params.user = params.user || false;

	var playerRef = ref.child('players').push(); // node-client generates the key syncly.
	var player = {
		id: playerRef.key(),
		user: params.user,
	};
	gD.players.push(player);

	var entityQuantities = {
		'fighter': (params.user ? GameParamsService.params.fightersPerNewUserPlayer : GameParamsService.params.fightersPerNewNonuserPlayer ),
		'blimp': (params.user ? GameParamsService.params.blimpsPerNewUserPlayer : GameParamsService.params.blimpsPerNewNonuserPlayer ),
	}
	createEntitiesForPlayer(entityQuantities,player);
}



function createEntitiesForPlayer(entityQuantities, player){
	var playerEntityTypeConstructors = { // note; some entities cannot be spawned directly for players, but must be spawned for fighters, etc. (i.e. lasers, missiles) ... however, I don't yet want to divide things out into Units, Projectiles, because in case of Missiles, you may want to control them directly, so for now I'm keeping it flat in Models.
		'fighter': Fighter,
		'blimp': Blimp, // COMING SOON!
	};
	for (var entityTypeName in entityQuantities){
		for (var i = 0; i < entityQuantities[entityTypeName]; i++) {
			
			var entityRef = ref.child('entities').push();

			var entity = new playerEntityTypeConstructors[entityTypeName]({
				id: entityRef.key(),
				fbRef: entityRef,
				player: player,
			});

			gD.entities
				.push(entity);
			gD.entitiesByType[entityTypeName]
				.push(entity);
		}
	}
}