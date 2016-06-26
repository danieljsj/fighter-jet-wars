var FighterBaseAtts = {


	engineAccel  		: 50, 	// afterburnerAccel in pixels per second^2
	afterburnerAccel 	: 100, 	// afterburnerAccel in pixels per second^2
	bodyDrag	 		: 0.2, 	// base coefficient of loss of velocity per second
	brakesDrag 			: 0.4, 	// brakes coefficient of loss of velocity per second
	turnRate	 		: 1.8, 	// turn rate in radians per second
	laserRefreshTime	: .5,	// 
	// respawnTime			: 2, // s
	respawnTime			: 0, // s
	range				: 999999999999999999999999 // px

	// these could be in a common file, but then again maybe we want them to render them one way and simulate another; so fine to leave separate between frontend and backend
	bodyHeight			: 32,	// px
	bodyWidth			: 32,	// px

}

//////////

module.exports = FighterBaseAtts;