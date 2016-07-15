'use strict';

function GameSnapshot(data){
	this.time = data.time;
	this.playersData = data.players;
	this.entitiesData = data.entities;
}

// function getA(cb){ // A stands for Async... trying out that naming...
function retrieveThen(cb){



    // $http({
    // 	method: 'GET',
    // 	url: 'http://localhost:4242/snapshot'
    // }).then(function success(response){
    // 	console.log("SNAPSHOT RESPONSE:",response);
    // 	cb(new GameSnapshot(response.data));
    // }, function error(response){
    // 	console.error("snapshot ERROR: ",response);
    // });

    const url = 'http://localhost:4242/snapshot';

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var resp = request.responseText;
      } else {
        // We reached our target server, but it returned an error

      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      throw 'there was an error with this request: '+request.toJSON();
    };

    request.send();

}

module.exports = {
    retrieveThen: retrieveThen,
}