const express = require('express');
const SimulationS = require('../../SimulationS');
const GameDataS = require('../../GameDataS');
const SnapshotS = require('../../SnapshotS');


function start(){

	var app = express();

	app.all('*', function(req, res, next) {
	  res.header('Access-Control-Allow-Credentials', true);
	  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  next();
	 });

	app.get('/snapshot', function(req,res){
		SimulationS.afterTick(function(currTick,dT){
			const snapshot = new SnapshotS.Snapshot(GameDataS.data,currTick)
			res.json(snapshot);
		});
	});

	app.listen(4242, function() {
		if (true) console.log('Game Server listening on port 4242');
	});

}


module.exports = {
	start:start,
};