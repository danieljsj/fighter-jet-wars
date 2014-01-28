
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


document.body.appendChild(canvas);


/*document.getElementById("controls").setAttribute(
	"style",
	"margin-top: -"+canvas.height+"px;"
); this sucks. jquery better. I'm gonna use absolute anyway.*/


// -- REGISTRY -- //

var registry = {
	
	entities: [],
		flyers: [],
			planes: [],
				players: [],
				comps: [], 
			lasers: [],

};


