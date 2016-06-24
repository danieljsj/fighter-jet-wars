'use strict';


var p = require('./components/common/p');
var controls = require('./components/common/controls');

class Blimp {
	constructor(player){
		this.p = p;
		this.player = player;
	}
}


module.exports = Blimp;