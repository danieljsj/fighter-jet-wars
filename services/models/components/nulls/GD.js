'use strict';

class GD {
	constructor(){
		this.tickStarted = false;
		this.tickCompleted = false;
		this.users = {};
		this.players = {};
		this.entities = {};
	}
}

module.exports = GD;