const env = {
	isBrowser: isBrowser,
	isNodejs: isNodejs,
	isCoreServer: isCoreServer,
	isAiServer: isAiServer,
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
function isAiServer(){
	return isNodejs() && (-1 < process.argv[1].indexOf('aiServer')); // a bit janky; doesn't support npm start... but works for now.
}

// if (isNodejs()){
// 	process.argv.forEach(function (val, index, array) {
// 	  console.log(index + ': ' + val);
// 	});
// }

module.exports = env;