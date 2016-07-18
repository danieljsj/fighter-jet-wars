'use strict';
// require('look').start(); // using node-debug instead


// vendor
var express = require('express');

// src
var FirebaseRefService = require('./services/FirebaseRefService');
var SimulationService = require('./services/SimulationService');
var SnapshotService = require('../common/services/SnapshotService');


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
	SimulationService.afterTick(function(currTick,dT){
		SimulationService.snapshotThen(currTick, function(snapshot){ // TODO: get CurrTick into gD so I don't have to pass it all over the dang place!!
			res.json(snapshot);
		});
	});
});

app.listen(4242, function() {
	console.log('Game Server listening on port 4242');
});