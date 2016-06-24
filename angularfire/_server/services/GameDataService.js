var FirebaseRefService = require('./FirebaseRefService');
var GameParamsService = require('./GameGlobalsService');

var Fighter = require('./models/Fighter.js');
var Blimp = require('./models/Blimp.js');

// privates:
// 
// 


module.exports = {
	data: data,
	initDataThen: initDataThen,
	getFlyers2dArr: getFlyers2dArr,
}


var data = {
	users: [],
	players: [],
	entities: [],
	entitiesByType: {
		fighters: []
	},
};


function initDataThen(cb){
	
	// 1 Computer player
	data.players.push({user: false});
	
	// 1 Human player for every registered user (regardless of whether logged in or not)
	var ref = FirebaseRefService.getRef(); if (!ref) throw "GameErr: FirebaseRefService has not initialized yet!";
	ref.child('users').on('child_added', function(ss){
		_addUserPlayer(ss.val());
	});

	// DO SOME ASYNC STUFF AND THEN RUN CB WHEN ITS ALL DONE. cb()

}


function _addUserPlayer(userSsVal){

	var user = {name: userSsVal.name};
	data.users.push(user);

	var player = {user: user}; // NOTE: NEED TO MAKE THIS BE A FIREBASE PUSH, SINCE WE'LL LIKELY WANT TO PUBLISH PLAYER LISTS. NOTE: FIREBASE DATA OTHER THAN USERS CAN BE COMPLETELY EPHEMORAL; WE CAN PERSIST INTO AND REBOOT FROM MONGO. SO ACTUALLY WE SHOULD PROBABLY DELETE ALL THE GAMEDATA OUT OF FIREBASE. FIREBASE CAN HAVE A "GAME" TOP-LEVEL-CHILD, WHICH WE DELETE UPON SERVER RESTART.
	data.players.push(player);

	var entityQuantities = { // might want to set this up with ability to do configs, but for now we'll stick to quantities.
		'fighter': GameParamsService.params.fightersPerNewUserPlayer,
	}
	_createEntitiesForPlayer(entityQuantities,player);
}

function _addComputerPlayer(){
	var player = {user: false}; // NOTE: SAME AS ABOVE.
	data.players.push(player);

	var entityQuantities = {
		'fighter': GameParamsService.params.fightersPerNewUserPlayer,
	}
	_createEntitiesForPlayer(entityQuantities,player);
}


function _createEntitiesForPlayer(entityQuantities, player){
	var playerEntityTypeConstructors = { // note; some entities cannot be spawned directly for players, but must be spawned for fighters, etc. (i.e. lasers, missiles) ... however, I don't yet want to divide things out into Units, Projectiles, because in case of Missiles, you may want to control them directly, so for now I'm keeping it flat in Models.
		'fighter': Fighter,
		'blimp': Blimp, // COMING SOON!
	};
	for (var entityTypeName in entityQuantities){
		for (var i = 0; i < entityQuantities[entityTypeName]; i++) {
			var entity = new playerEntityTypeConstructors[entityTypeName]({player: player});
			data.entities.push(entity);
			data.entitiesByType[entityTypeName].push(entity);
		}
	}
}




function getFlyers(){ // went with a 2dArr because I'd think it takes less cpuwork than Concatting everything into a flat array.
	return filterEntitiesToFlyers(data.entities);
}
function filterEntitiesToFlyers(entities){
	var flyerEntityTypeNames = [
		'fighter',
		'blimp',
		'laser',
	];
	return entities.filter(function(entity){ return -1 < flyerEntityTypeNames.indexOf(entity.entityTypeName); });	
}