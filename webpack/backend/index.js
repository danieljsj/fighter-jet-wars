'use strict';


var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require function to requirejs so that node modules are loaded relative to the top-level JS file.
    nodeRequire: require,
    paths: {
    	services: '../_commonServices',
    	
    	models: '../_commonServices/models',
    	
    	atts: 	'../_commonServices/models/components/atts',
    	methods:'../_commonServices/models/components/methods',
    	nulls: 	'../_commonServices/models/components/nulls',
    }
});


// require('look').start(); // using node-debug instead


// vendor
var express = requirejs('express');
// src

requirejs(['services/FirebaseRefService'],
  function( FbRefServ ){
  	FbRefServ;
  }
)


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