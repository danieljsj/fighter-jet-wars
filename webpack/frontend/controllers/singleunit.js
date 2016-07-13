'use strict';

// PLAN: in player (or, temporarily, user), we save a "controlledEntityId --- I may have even written that somewhere; then entities check if their user is controlling them, and if not, they run their ais. you can have multiple windows open, multiple computers. also maybe a browser-instance can be kept; a 'console' object, and if a console is viewing a unit, then it skips over that unit when you toggle other consoles. actually that's goofy because sometimes you could infinite loop if you added a new console. better to let them select any."
// UNLESS we want you to be able to have your user account controlling multiple... but I think that's perhaps cheating because then we're giving the user-controlled powerup to multiple planes on your team, allowing more fame points for your team. Which maybe is cool. An option for another day.

/**
 * @ngdoc function
 * @name angularfireApp.controller:SingleunitCtrl
 * @description
 * # SingleunitCtrl
 * Controller of the angularfireApp
 */
angular.module('angularfireApp')
  .controller('SingleunitCtrl', function (Ref, user, $rootScope, $timeout, KnownEntitiesService, LeafletMapService, SkyCanvasService, KeyboardControlsService) {
  	var vm = this;


  	// SINGLE UNIT VIEW-MODEL:
	
	LeafletMapService.initMap('leafletMap');
	SkyCanvasService.initCanvas('skyCanvas');

	KnownEntitiesService.pullEntitiesAndRenderThen(function(entities){
		console.log('entities pulled into vm:',entities);
		vm.entities = entities;
	});



  	// SINGLE UNIT CONTROL:

	var userRef = Ref.child('users/'+user.uid); // NOTE! At some point I may want to switch this to being playerRef since with multiple servers a user will associate to multiple "players", one per server.
	/// userRef WILL NEED TO TURN INTO A SERVICE... WE'LL NEED FIREBASEDATASERVICE
	/// 
	// FOR DEBUGGING; won't need to see/subscribe to our own controls... unless we really want to...
  	userRef.on('value', function(ss){ // should eventually be Player, but haven't set it to be that yet
  		vm.player = ss.val();
  		$timeout(function(){$rootScope.$apply()});
  	});



  });