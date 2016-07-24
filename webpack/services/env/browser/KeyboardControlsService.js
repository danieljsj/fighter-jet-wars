'use strict';

const CurrentUserService = require('./CurrentUserService');
const FirebaseRefService = require('../../FirebaseRefService');
const GameDataService = require('../../GameDataService');




let commandsRef;
let offset;
FirebaseRefService.initThen(function(){
  
  commandsRef = FirebaseRefService.ref.child('commands');
  
  var offsetRef = FirebaseRefService.ref.child(".info/serverTimeOffset");
  offsetRef.on("value", function(snap) {
    offset = snap.val();
  });

}); // TODO: make a CommandsRefService? so I don't have to do this everywhere?... // ALSO... figure out smarter ways of init'ing everything... once I need to wait for auth this is going to get annoying again...



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

const lasts = {
  'fore':null,
  'back':null,
  'left':null,
  'right':null,
  'tryFire':null
}

function sendCommand(key,val){

  if (lasts[key] != val){
    
    lasts[key] = val;

    var entities = GameDataService.data.entities;
    
    let id;
    for (const idYup in entities){
      id = idYup;
      break;
    }

    const cmd = {
      eId: id,
      key: key,
      val: val,
      bT: (new Date()).getTime() + offset,
      sT: require('firebase').ServerValue.TIMESTAMP,
    };

    console.log('sending cmd: ',cmd);

    commandsRef.push().set(cmd);
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