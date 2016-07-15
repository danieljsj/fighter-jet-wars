'use strict';

const UserService = require('../services/UserService');
const FirebaseRefService = require('./FirebaseRefService');

var userRef;

FirebaseRefService.initThen(function(){
  userRef = FirebaseRefService.ref.child('users/'+UserService.user.uid);
}); // TODO: make a UserRefService so I don't have to do this everywhere... // ALSO... figure out smarter ways of init'ing everything... once I need to wait for auth this is going to get annoying again...




// NEEDS userRef!!!!!!!!!!
// NEEDS module.exports!!!!!!!!!!


function onKeyDown(event) {
  var keyCode = event.keyCode;
  // console.log(keyCode);
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
    // left arrow 37
    // up arrow 38
    // right arrow  39
    // down arrow 40
  }
}

function start(){

  //event listener
  window.addEventListener('keydown', onKeyDown, false);
  window.addEventListener('keyup', onKeyUp, false);
  
}

function stop(){
  
  //event listener
  window.removeEventListener('keydown', onKeyDown, false);
  window.removeEventListener('keyup', onKeyUp, false);  
}


module.exports = {
  start: start,
  stop: stop
};