const express = require('express');
const SimulationService = require('../../SimulationService');
const GameDataService = require('../../GameDataService');
const SnapshotService = require('../../SnapshotService');


function start(){

	var app = express();

	app.all('*', function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  next();
	 });

	app.get('/snapshot', function(req,res){
		SimulationService.afterTick(function(currTick,dT){
			const snapshot = new SnapshotService.Snapshot(GameDataService.data,currTick)
			res.json(snapshot);
		});
	});

	app.listen(4242, function() {
		console.log('Game Server listening on port 4242');
	});

}


module.exports = {
	start:start,
};