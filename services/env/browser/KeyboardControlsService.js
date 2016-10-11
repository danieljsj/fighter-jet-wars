'use strict';

const CurrentUserService = require('./CurrentUserService');
const FirebaseRefService = require('../../FirebaseRefService');
const GDS = require('../../GameDataService');
const sendCommand = require('../../io/CommandsService').send;


function onKeyDown(event) {

  var keyCode = event.keyCode;

  switch (keyCode) {
    case 87: //w
      sendCommand('fore', 1, uPId());
      break;
    case 83: //s
      sendCommand('back', 1, uPId());
      break;
    case 65: //a
      sendCommand('left', 1, uPId());
      break;
    case 68: //d      
      sendCommand('right', 1, uPId());
      break;
    case 32: //space      
      sendCommand('tryFire', 1, uPId());
      break;
  }
}

function onKeyUp(event) {
  var keyCode = event.keyCode;

  switch (keyCode) {
    case 87: //w
      sendCommand('fore', 0, uPId());
      break;
    case 83: //s
      sendCommand('back', 0, uPId());
      break;
    case 65: //a
      sendCommand('left', 0, uPId());
      break;
    case 68: //d      
      sendCommand('right', 0, uPId());
      break;
    case 32: //space      
      sendCommand('tryFire', 0, uPId());
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



function GET_USER_PLAYER_ENTITY(){
  const userId = 'b7sEsa8pUWOyWnDYAQCdPjdhFG02';
  
  const entities = GDS.data.entities;
  for (const entityId in entities) {
    const entity = entities[entityId];
    if (
      entity 
      && 
      entity.player 
      && 
      entity.player.user 
      && 
      (userId == entity.player.user.id)
    ) {
      return entity;
    }
  }
  alert('NO USER PLAYER ENTITY FOUND!');
}

function uPId(){
  return GET_USER_PLAYER_ENTITY().id;
}


// setInterval(uPId, 17);