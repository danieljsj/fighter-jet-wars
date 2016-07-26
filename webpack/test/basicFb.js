var firebase = require("firebase");

firebase.initializeApp({
  serviceAccount: "firebase-service-account-auth-config-9213f17c7853.json",
  databaseURL: "https://fighter-jets.firebaseio.com"
});

var testRef = firebase.database().ref().child('test/basicNodeFbTest');

testRef.push().set({foo:'bar'}, function(err){
	if(err)throw(err);

	console.log('success');
});