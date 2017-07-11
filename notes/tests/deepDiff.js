console.log("____________________");

function is_scalar(obj){return (/string|number|boolean/).test(typeof obj);}

ob1 = {
	"num":1,
	"ob":{
		"deepnumA":1,
		"deepnumB":3,
	}
}

ob2 = {
	"num":2,
	"ob":{
		"deepnumA":2,
		"deepnumB":3,
	}
}


function iterateAndReportDeepDifferences(ob1,ob2){
	console.log("iterateAndReportDeepDifferences on")
	console.log(ob1);
	console.log(ob2);
	const diffMap = {};
	for (key in ob1) {
		console.log("comparing",key,ob1[key],ob2[key]);
		if (ob1[key]===ob2[key]){
			console.log("items are identical; ignoring them");
		} else {
			if (is_scalar(ob1[key])&&is_scalar(ob2[key])){
				console.log("diffed are scalar; saving ob2[key] into diffMap[key]: ",ob2[key]); // whoah, this keep
				diffMap[key] = ob2[key];
			} else {
				const subDiffMap = iterateAndReportDeepDifferences(ob1[key],ob2[key]); 
				console.log("saving diffMap into",key); // whoah, this keep
				diffMap[key] = subDiffMap;
			}
		}
	}
	return diffMap;
}


const diffMap = iterateAndReportDeepDifferences(ob1,ob2);

console.log('diffMap',diffMap);