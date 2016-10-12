'use strict';

module.exports = function(){
	return {
		// timestamp: 0, // what would this have been, and what would we have wanted it for?
		fore: 0,
		back: 0,
		left: 0,
		right: 0,
		tryFire: 0,
		trySwitch: 0,
	} // zeros instead of empties fixed a deal where the planes were having no controls values. "Firebase removes nodes that have null values"!!! http://stackoverflow.com/questions/27580844/firebase-wont-save-keys-with-null-values
}