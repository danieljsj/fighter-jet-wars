'use strict';
// require('look').start(); // using node-debug instead


// vendor
var express = require('express');

// src
var FirebaseRefService = require('../../FirebaseRefService');
var SimulationService = require('./SimulationService');

require('./Server'); // at the moment it doesn't return anything needed 

// todo: switch to some cool async waterfall or something
FirebaseRefService.initThen(function(){
	SimulationService.start();
});