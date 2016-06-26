'use strict';

/**
 * @ngdoc function
 * @name angularfireApp.controller:SingleunitCtrl
 * @description
 * # SingleunitCtrl
 * Controller of the angularfireApp
 */
angular.module('angularfireApp')
  .controller('SingleunitCtrl', function (Ref, $rootScope, LeafletMapService) {
  	var vm = this;

	var p1Ref = Ref.child('players/1');




	// MAP:
	
	LeafletMapService.startMap('leafletMap')


  	// SINGLE UNIT DISPLAY:

  	p1Ref.on('value', function(snapshot){
  		vm.p1 = snapshot.val();
  		$rootScope.$apply();
  	});




  	// SINGLE UNIT CONTROL:


	//event listener
	window.addEventListener('keydown', onKeyDown, false);
	window.addEventListener('keyup', onKeyUp, false);

	function onKeyDown(event) {
	  var keyCode = event.keyCode;
	  console.log(keyCode);
	  switch (keyCode) {
	    case 87: //w
	      p1Ref.child('controls/accellerating').set(1);
	      break;
	    case 83: //s
	      p1Ref.child('controls/braking').set(1);
	      break;
	    case 65: //a
	      p1Ref.child('controls/turningLeft').set(1);
	      break;
	    case 68: //d      
	      p1Ref.child('controls/turningRight').set(1);
	      break;
	  }
	}

	function onKeyUp(event) {
	  var keyCode = event.keyCode;

	  switch (keyCode) {
	    case 87: //w
	      p1Ref.child('controls/accellerating').set(0);
	      break;
	    case 83: //s
	      p1Ref.child('controls/braking').set(0);
	      break;
	    case 65: //a
	      p1Ref.child('controls/turningLeft').set(0);
	      break;
	    case 68: //d      
	      p1Ref.child('controls/turningRight').set(0);
	      break;
	  }
	}




  });
