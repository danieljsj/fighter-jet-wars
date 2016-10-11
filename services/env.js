const env = {
	isBrowser: isBrowser,
	isServer: isServer,
	isAiClient: isAiClient,
	
	isNodejs: isNodejs,
	isNode: isNode,
	isClient: isClient,
}

function isBrowser(){
	return 'undefined' !== typeof window;
}
function isNodejs(){
	return !isBrowser();
}
function isNode(){
	return isNodejs();
}
function isServer(){
	return isNodejs() && (-1 < process.argv[1].indexOf('server')); // a bit janky; doesn't support npm start... but works for now.
}
function isAiClient(){
	return isNodejs() && (-1 < process.argv[1].indexOf('aiClient')); // a bit janky; doesn't support npm start... but works for now.
}
function isClient(){
	return !isServer();
}

module.exports = env;