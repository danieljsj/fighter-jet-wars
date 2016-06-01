// TODOS OF INTEREST:
// "lead"; figure out in general how far behind the server (not firebase) time, and render everything at where it theoretically is on the server. (whoah... wait... does that work? show me the current state? or better yet - show me a predicted future state -- a state as far ahead of the server's reality as my commands are from reaching the server. which will mean some jumpiness... not too fancy; each plane's draw() function would project it ahead by a dT.)
// rebuild the whole thing without firebase, with only websockets (hosting costs?!)

var firebase = require('firebase');

// console.log("|||");
// console.log(firebase);
// console.log("|||");
// console.log(firebase.initializeApp);
// console.log("|||");

var firebaseConfig = {

	
	// SHOULD BE GOOD:
	serviceAccount: "server/config/auth-config-default.json",
	databaseURL: "https://fighter-jets.firebaseio.com",
	
	// MIGHT ALSO WORK:
	// projectId: "fighter-jets",
 	// clientEmail: "game-server-0@fighter-jets.iam.gserviceaccount.com",
 	// privateKey: "-----BEGIN PRIVATE KEY-----lalalalal\n-----END PRIVATE KEY-----\n",
	

	// NOT NEEDED:
	// apiKey: "AIzaSyB0wRqUQWX0nfOl7TC8ydGgs0MGXnLJ_9Y", // no good on server
	// authDomain: "fighter-jets.firebaseapp.com", // not relevant
	// storageBucket: "fighter-jets.appspot.com", // not relevant
};

/*var app = */firebase.initializeApp(firebaseConfig);




var p1Ref = firebase.database().ref("players/1");

var p1 = {
	controls: 	null,
	p: 			null,
};

p1Ref.on('value', function(p1Snapshot){
	p1.controls = p1Snapshot.val().controls;
	p1.p = p1Snapshot.val().p;
});


var lastTime = new Date().getTime();
var p1LastTimeJSON = JSON.stringify(p1);
var p1LastTime = JSON.parse(p1LastTimeJSON);
setInterval(function(){

	var newTime = new Date().getTime();
	var dT = newTime - lastTime;
	lastTime = newTime;

	if (p1.p && p1.controls){
		p1.p.x += dT * (p1.controls.turningRight - p1.controls.turningLeft);
		p1.p.y += dT * (p1.controls.braking - p1.controls.accellerating); // needs some renames here...

		var newJSON = JSON.stringify(p1.p);

		if ( newJSON !== p1LastTimeJSON ) {
			// console.log(newJSON + '!==' + p1LastTimeJSON);
			console.log('sending '+ newJSON);
			p1Ref.child('p').set(p1.p);
			p1LastTimeJSON = newJSON;
			p1LastTime = JSON.parse(p1LastTimeJSON);
		}
	}

},1);