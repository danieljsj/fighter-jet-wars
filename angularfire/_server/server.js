'use strict';

require('look').start();

// vendor
var express = require('express');
// src
var FirebaseRefService = require('./services/FirebaseRefService');
var SimulationService = require('./services/SimulationService');
var SnapshotService = require('./services/SnapshotService');


// todo: switch to some cool async waterfall or something
FirebaseRefService.initThen(function(){
	SimulationService.start();
});


var app = express();

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/snapshot', function(req,res){
	SnapshotService.doSnapshotAfterTick(
		function(gameSnapshot){
			res.json(gameSnapshot);
		}
	);
});

app.listen(4242, function() {
	console.log('Game Server listening on port 4242');
});