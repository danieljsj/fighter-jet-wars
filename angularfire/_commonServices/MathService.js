'use strict';

const standardGraduation = 0.1;

class MathService {
	roundTo(float,graduation){
		graduation = graduation || standardGraduation;
		return Math.round(rate/graduation)*graduation;
	}
}