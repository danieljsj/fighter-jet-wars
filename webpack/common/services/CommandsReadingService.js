const FirebaseRefService = require('./FirebaseRefService');
const GameDataService = require('./GameDataService');

function start(){

	FirebaseRefService.initThen(function(){
		const commandsRef = FirebaseRefService.ref.child('commands');
		commandsRef.on('child_added', function(commandSnapshot){

			const cmd = commandSnapshot.val();

			console.log('received cmd: ',cmd);

			GameDataService.data.entities[cmd.eId].controls[cmd.key] = cmd.val;

			// COMING SOON: Crazy stuff involving ticks and so on!

		});
	});

}

module.exports = {
	start: start
}