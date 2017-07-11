'use strict';
console.log("____________________");


const ob1 = {
	"num":1,
	"ob":{
		"deepnumA":1,
		"deepnumB":1,
	}
}

const ob2 = {
	"num":1,
	"ob":{
		"deepnumA":1,
		"deepnumB":2,
	}
}


///////////////// code from differ goes here


const diffMap = iterateAndReportDeepDifferences(ob1,ob2);

console.log('diffMap',diffMap);