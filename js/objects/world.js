
"use strict";

var nullFunc = function(){return null;}

// -- CANVAS -- //



// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth*1;
canvas.height = window.innerHeight*1;

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


