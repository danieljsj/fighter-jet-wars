'use strict';

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


module.exports = {
	data: gD,
	start: start,
}


function start(){
	addComputerPlayer();
	listenToFbUserAdds();
}


///////////


function listenToFbUserAdds(){
		
	// 1 user player for every registered user (regardless of whether logged in or not) -- their planes will run on AI.
	var ref = FirebaseRefService.getRef(); if (!ref) throw "GameErr: FirebaseRefService has not initialized yet!";

	ref.child('users').on('child_added', function(ss, prevChildId){
		var user = { // TODO: MAKE THIS BE A REAL MODEL...
			name: ss.val().name,
			id: ss.key()
		};
		addUserPlayer(user);
	});

}




function addUserPlayer(user){

	gD.users.push(user);

	var player = {user: user}; // NOTE: NEED TO MAKE THIS BE A FIREBASE PUSH, SINCE WE'LL LIKELY WANT TO PUBLISH PLAYER LISTS. NOTE: FIREBASE DATA OTHER THAN USERS CAN BE COMPLETELY EPHEMORAL; WE CAN PERSIST INTO AND REBOOT FROM MONGO. SO ACTUALLY WE SHOULD PROBABLY DELETE ALL THE GAMEDATA OUT OF FIREBASE. FIREBASE CAN HAVE A "GAME" TOP-LEVEL-CHILD, WHICH WE DELETE UPON SERVER RESTART.
	gD.players.push(player);

	var entityQuantities = { // might want to set this up with ability to do configs, but for now we'll stick to quantities.
		'fighter': GameParamsService.params.fightersPerNewUserPlayer,
	}
	createEntitiesForPlayer(entityQuantities,player);
}

function addComputerPlayer(){
	var player = {user: false}; // NOTE: SAME AS ABOVE.
	gD.players.push(player);

	var entityQuantities = {
		'fighter': GameParamsService.params.fightersPerNewUserPlayer,
	}
	createEntitiesForPlayer(entityQuantities,player);
}


function createEntitiesForPlayer(entityQuantities, player){
	var playerEntityTypeConstructors = { // note; some entities cannot be spawned directly for players, but must be spawned for fighters, etc. (i.e. lasers, missiles) ... however, I don't yet want to divide things out into Units, Projectiles, because in case of Missiles, you may want to control them directly, so for now I'm keeping it flat in Models.
		'fighter': Fighter,
		'blimp': Blimp, // COMING SOON!
	};
	console.log(entityQuantities, gD.entitiesByType);
	for (var entityTypeName in entityQuantities){
		for (var i = 0; i < entityQuantities[entityTypeName]; i++) {
			var entity = new playerEntityTypeConstructors[entityTypeName]({player: player});
			gD.entities
				.push(entity);
			gD.entitiesByType[entityTypeName]
				.push(entity);
		}
	}
}