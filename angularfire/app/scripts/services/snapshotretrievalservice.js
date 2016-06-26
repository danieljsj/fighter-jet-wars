'use strict';

/**
 * @ngdoc service
 * @name angularfireApp.SnapshotRetrievalService
 * @description
 * # SnapshotRetrievalService
 * Service in the angularfireApp.
 */
angular.module('angularfireApp')
  .service('SnapshotRetrievalService', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function


    

    function GameSnapshot(data){
    	this.time = data.time;
    	this.playersData = data.players;
    	this.entitiesData = data.entities;
    }


    // function getA(cb){ // A stands for Async... trying out that naming...
    function getSnapshotThen(cb){
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


    this.getSnapshotThen = getSnapshotThen;

  });