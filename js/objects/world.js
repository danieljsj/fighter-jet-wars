
"use strict";

var nullFunc = function(){return null;}

// -- CANVAS -- //




// Create the canvas
var canvas = document.createElement("canvas");
canvas.style["z-index"] = 1;
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