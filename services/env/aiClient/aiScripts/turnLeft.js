const sendCommand = require('../../../io/CommandsS').send;

function turnLeft(eId){

	sendCommand('left',1,eId);

}

module.exports = turnLeft;