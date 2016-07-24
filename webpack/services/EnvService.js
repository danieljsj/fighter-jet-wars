const envs = {
	BROWSER: 'ENV_BROWSER',
	CORE_SERVER: 'ENV_CORE_SERVER',
	AI_SERVER: 'ENV_AI_SERVER',
};

function env(){
	if ('undefined' !== typeof window){
		return envs.BROWSER;
	} else {
		return envs.CORE_SERVER;
	}
}

module.exports = {
	envs: envs,
	env: env,
}