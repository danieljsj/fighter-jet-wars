const FirebaseRefService = require('../services/FirebaseRefService');

FirebaseRefService.initThen(function(){
	const ref = FirebaseRefService.ref;
	console.log('about to set foo to bar (i.e. testing fb data send from root file of app...)');
	const testRef = ref.child('test/nodeSimpleServiceSetData');
	testRef.push().set({foo:'bar'}, function onComplete(err){
		if (err) throw err;
		console.log('foo set to bar (fb send from root file of app successful.)');
	});
});