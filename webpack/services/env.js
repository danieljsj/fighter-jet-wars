const env = {
	isBrowser: isBrowser,
	isNodejs: isNodejs,
	isCoreServer: isCoreServer,
	isAiClient: isAiClient,
}



function isBrowser(){
	return 'undefined' !== typeof window;
}
function isNodejs(){
	return !isBrowser();
}
function isCoreServer(){
	return isNodejs() && (-1 < process.argv[1].indexOf('coreServer')); // a bit janky; doesn't support npm start... but works for now.
}
function isAiClient(){
	return isNodejs() && (-1 < process.argv[1].indexOf('aiClient')); // a bit janky; doesn't support npm start... but works for now.
}

// if (isNodejs()){
// 	process.argv.forEach(function (val, index) {
//  // ...
// 	});
// }

module.exports = env;