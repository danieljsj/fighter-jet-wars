var FirebaseRefService = require('./FirebaseRefService');
var gD = require('./GameDataService').data;

module.exports = {
	send: send,
}

function send {
	var redactedEntities = {};
	gD.entities.forEach(function(entity){
		redactedEntities[entity.$id] = {
			entityTypeName: entity.entityTypeName,
			p: entity.p,
			player: entity.player.id,
		};
	});

	FirebaseRefService.getRef('entities').set(redactedEntities, function(err){
		if (err) throw err;
		console.log('SENT A PILE OF DATA');
	}); // set rewrites whole node, whereas update just changes vals.
}
// Trying a broadcasting service that sends them all at once. We'll see if that works. We can test it against sending incremental tiny changes one by one. Basically trying to find optimum request number/size tradeoff.
// Ultimately I'm pretty certain that they're going to want me to do things on a model-by-model basis; but for now, like i said, just going to stick with slapping everything up there all at once.