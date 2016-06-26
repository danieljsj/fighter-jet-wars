'use strict';

// PLAN: in player (or, temporarily, user), we save a "controlledEntityId --- I may have even written that somewhere; then entities check if their user is controlling them, and if not, they run their ais. you can have multiple windows open, multiple computers. also maybe a browser-instance can be kept; a 'console' object, and if a console is viewing a unit, then it skips over that unit when you toggle other consoles. actually that's goofy because sometimes you could infinite loop if you added a new console. better to let them select any."

/**
 * @ngdoc function
 * @name angularfireApp.controller:SingleunitCtrl
 * @description
 * # SingleunitCtrl
 * Controller of the angularfireApp
 */
angular.module('angularfireApp')
  .controller('SingleunitCtrl', function (Ref, user, $rootScope, LeafletMapService) {
  	var vm = this;

	var userRef = Ref.child('users/'+user.uid); // NOTE! At some point I may want to switch this to being playerRef since with multiple servers a user will associate to multiple "players", one per server.




	// MAP:
	
	LeafletMapService.startMap('leafletMap')


  	// SINGLE UNIT DISPLAY:

  	userRef.on('value', function(snapshot){
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
	      userRef.child('controls/fore').set(1);
	      break;
	    case 83: //s
	      userRef.child('controls/back').set(1);
	      break;
	    case 65: //a
	      userRef.child('controls/left').set(1);
	      break;
	    case 68: //d      
	      userRef.child('controls/right').set(1);
	      break;
	    case 32: //space      
	      userRef.child('controls/tryFire').set(1);
	      break;
	  }
	}

	function onKeyUp(event) {
	  var keyCode = event.keyCode;

	  switch (keyCode) {
	    case 87: //w
	      userRef.child('controls/fore').set(0);
	      break;
	    case 83: //s
	      userRef.child('controls/back').set(0);
	      break;
	    case 65: //a
	      userRef.child('controls/left').set(0);
	      break;
	    case 68: //d      
	      userRef.child('controls/right').set(0);
	      break;
	    case 32: //space      
	      userRef.child('controls/tryFire').set(0);
	      break;
	      // later: controls/trySwitch? tryNext,tryPrev?
			// left arrow	37
			// up arrow	38
			// right arrow	39
			// down arrow	40
	  }
	}





  });
