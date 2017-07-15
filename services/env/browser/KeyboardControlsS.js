'use strict';

const CurrentUserS = require('./CurrentUserS');
const FirebaseRefS = require('../../FirebaseRefS');
const sendCommand = require('../../io/CommandsS').send;

let mainSim;

function onKeyDown(event) {

  var keyCode = event.keyCode;

  switch (keyCode) {
    case 87: //w
      sendCommand('fore', 1, uPEId());
      break;
    case 83: //s
      sendCommand('back', 1, uPEId());
      break;
    case 65: //a
      sendCommand('left', 1, uPEId());
      break;
    case 68: //d      
      sendCommand('right', 1, uPEId());
      break;
    case 32: //space      
      sendCommand('tryFire', 1, uPEId());
      break;
  }
}

function onKeyUp(event) {
  var keyCode = event.keyCode;

  switch (keyCode) {
    case 87: //w
      sendCommand('fore', 0, uPEId());
      break;
    case 83: //s
      sendCommand('back', 0, uPEId());
      break;
    case 65: //a
      sendCommand('left', 0, uPEId());
      break;
    case 68: //d      
      sendCommand('right', 0, uPEId());
      break;
    case 32: //space      
      sendCommand('tryFire', 0, uPEId());
      break;
      // later: controls/trySwitch? tryNext,tryPrev?
    // left arrow 37
    // up arrow 38
    // right arrow  39
    // down arrow 40
  }
}



function start(sim){
  mainSim = sim;
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
  const userPlayerEntityIds = [];
  const entities = mainSim.gD.entities;
  for (const entityId in entities) {
    const entity = entities[entityId];
    if (
      entity 
      && 
      entity.player 
      && 
      entity.player.user 
    ) {
      userPlayerEntityIds.push(entity.player.user.id); // this seems bloated, not sure why i'm doing this; I just need the entity; must be for debugging.
      if (userId == entity.player.user.id){
        return entity;
      }
    }
  }
  alert('NO USER PLAYER ENTITY FOUND!');
  alert('userId: '+userId);
  alert('userPlayerEntityIds: '+userPlayerEntityIds.join(','));
}

function uPEId(){
  return GET_USER_PLAYER_ENTITY().id;
}


// setInterval(uPEId, 17);