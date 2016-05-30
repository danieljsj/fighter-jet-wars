
"use strict";

var nullFunc = function(){return null;}

// -- CANVAS -- //




// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

// Canvas resizing
function setCanvasWidth(){
	canvas.width = window.innerWidth*1;
	canvas.height = window.innerHeight*1;
}

window.onload 	= setCanvasWidth;
window.onresize = setCanvasWidth;
setInterval(setCanvasWidth, 1000);


document.body.appendChild(canvas);


/*document.getElementById("controls").setAttribute(
	"style",
	"margin-top: -"+canvas.height+"px;"
); this sucks. jquery better. I'm gonna use absolute anyway.*/


// -- registries -- //

var registries = {
	
	entities: [],
		flyers: [],
			planes: [],
				players: [],
				comps: [], 
			lasers: [],

};

// this will be used for cleaning up the registries when something is unset.
Array.prototype.clean = function() {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == undefined) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};