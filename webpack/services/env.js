const env = {
	isBrowser: isBrowser,
	isCoreServer: isCoreServer	
}

function isBrowser(){
	return 'undefined' !== typeof window;
}
function isCoreServer(){
	return !isBrowser();
}

module.exports = env;