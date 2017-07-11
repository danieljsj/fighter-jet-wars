'use strict';


const FirebaseRefS = require('../services/FirebaseRefS');

const getOffset = require('../services/FirebaseOffsetS').getOffset;


const timestampPlaceholder = require('firebase').database.ServerValue.TIMESTAMP;




const testsTimes = {};



function tryIt(){
	setTimeout(function(){

		console.log(getOffset());
		if (getOffset()) {
			doIt();
		} else {
			tryIt();
		}

	},100);
}

function doIt(){

	FirebaseRefS.initThen(function(){


		const ref = FirebaseRefS.ref;

		const latencyRef = ref.child('test/latency');
		

		latencyRef.on('child_added',function(){
			// do nothing, child_added is silly
		});

		latencyRef.on('child_changed',function(ss){
			
			testsTimes[ss.key].server = ss.val().serverTime;

			reportMaybe(ss.key);
		});



		const latencyTest = latencyRef.push();

		testsTimes[latencyTest.key] = {start: new Date().getTime() + getOffset() };

		latencyTest.set({serverTime:timestampPlaceholder}, function onReturn(err){
			if(err)throw(err);

			for (const key in testsTimes) {
				if (! testsTimes[key].reported ){
					testsTimes[key].return = new Date().getTime() + getOffset();
			 		reportMaybe(key);
				}
			} 
		});

	});
}

function reportMaybe(key){

	const startTime = testsTimes[key].start;
	const serverTime = testsTimes[key].server;
	const returnTime = testsTimes[key].return;
	const alreadyReported = testsTimes[key].reported;

	if (startTime && serverTime && returnTime && (!alreadyReported) ){

		testsTimes[key].reported = true;

		console.log('startTime',startTime);
		console.log('serverTime',serverTime);
		console.log('returnTime',returnTime);


		console.log('startTime -> serverTime :',serverTime - startTime);
		console.log('serverTime -> returnTime:',returnTime - serverTime);
		console.log('startTime -> returnTime :',returnTime - startTime);	

		console.log();
		console.log();
		console.log();

		setTimeout(doIt,1000);

	}

}


tryIt();