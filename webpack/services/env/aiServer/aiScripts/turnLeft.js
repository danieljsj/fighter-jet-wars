const CommandsService = require('../../../CommandsService');

function turnLeft(eId){

	sendCommand('left',1,eId);

}

module.exports = turnLeft;