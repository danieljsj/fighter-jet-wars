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

GD.prototype.tick = function(){
	if (this.tickStarted == this.tickCompleted){
		return this.tickCompleted;
	} else {
		throw new Error('What the heck are you doing calling for tick when a tick is in progress?');
	}
}

module.exports = GD;