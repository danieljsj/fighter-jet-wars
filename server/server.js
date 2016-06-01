var firebase = require('firebase');

// console.log("|||");
// console.log(firebase);
// console.log("|||");
// console.log(firebase.initializeApp);
// console.log("|||");

var firebaseConfig = {

	
	// SHOULD BE GOOD:
	serviceAccount: "server/auth-config-default.json",
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
	controls: null,
	p:{x:10, y:10}
};

p1Ref.child('controls').on('value', function(controlsSnapshot){
	p1.controls = controlsSnapshot.val();
});


var time = new Date().getTime();
setInterval(function(){

	var newTime = new Date().getTime();
	var dT = newTime - time;
	time = newTime;

	if (p1.controls){
		p1.p.x += dT * (p1.controls.turningRight - p1.controls.turningLeft);
		p1.p.y += dT * (p1.controls.decelerating - p1.controls.accellerating);
		p1Ref.child('p').set(p1.p);
	}

},1);