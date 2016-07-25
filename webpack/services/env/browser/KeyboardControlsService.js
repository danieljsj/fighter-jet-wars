'use strict';

const CurrentUserService = require('./CurrentUserService');
const FirebaseRefService = require('../../FirebaseRefService');
const GameDataService = require('../../GameDataService');
const sendCommand = require('../../CommandsService').send;


function onKeyDown(event) {

  var keyCode = event.keyCode;
  // console.log(keyCode);
  switch (keyCode) {
    case 87: //w
      sendCommand('fore', 1);
      break;
    case 83: //s
      sendCommand('back', 1);
      break;
    case 65: //a
      sendCommand('left', 1);
      break;
    case 68: //d      
      sendCommand('right', 1);
      break;
    case 32: //space      
      sendCommand('tryFire', 1);
      break;
  }
}

function onKeyUp(event) {
  var keyCode = event.keyCode;

  switch (keyCode) {
    case 87: //w
      sendCommand('fore', 0);
      break;
    case 83: //s
      sendCommand('back', 0);
      break;
    case 65: //a
      sendCommand('left', 0);
      break;
    case 68: //d      
      sendCommand('right', 0);
      break;
    case 32: //space      
      sendCommand('tryFire', 0);
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