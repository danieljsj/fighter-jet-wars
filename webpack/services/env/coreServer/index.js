'use strict';
// require('look').start(); // using node-debug instead


// vendor
var express = require('express');

// src
var FirebaseRefService = require('./services/FirebaseRefService');
var SimulationService = require('./services/SimulationService');

require('./Server'); // at the moment it 

// todo: switch to some cool async waterfall or something
FirebaseRefService.initThen(function(){
	SimulationService.start();
});