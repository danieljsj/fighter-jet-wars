const sendCommand = require('../../../io/CommandsService').send;

function turnLeft(eId){

	sendCommand('left',1,eId);

}

module.exports = turnLeft;