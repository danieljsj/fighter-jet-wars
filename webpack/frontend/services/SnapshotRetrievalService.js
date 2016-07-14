'use strict';

function GameSnapshot(data){
	this.time = data.time;
	this.playersData = data.players;
	this.entitiesData = data.entities;
}

// function getA(cb){ // A stands for Async... trying out that naming...
function retrieveThen(cb){
    $http({
    	method: 'GET',
    	url: 'http://localhost:4242/snapshot'
    }).then(function success(response){
    	console.log("SNAPSHOT RESPONSE:",response);
    	cb(new GameSnapshot(response.data));
    }, function error(response){
    	console.error("snapshot ERROR: ",response);
    });
}

module.exports = {
    retrieveThen: retrieveThen,
}