'use strict';

require('look').start();


var express = require('express');
var app = express();


var FirebaseRefService = require('./services/FirebaseRefService');
var SimulationService = require('./services/SimulationService');
var SnapshotService = require('./services/SnapshotService');


// todo: switch to some cool async waterfall or something
FirebaseRefService.initThen(function(){
	SimulationService.start();
});


app.get('/snapshot', function(req,res){
	res.json({foo:'bar'});
});

app.listen(4242, function() {
	console.log('Game Server listening on port 4242');
});