module.exports = Blimp;

var p = require('./common/p');
var controls = require('./common/controls');

class Blimp {
	constructor(player){
		this.p = p;
		this.player = player;
	}
}