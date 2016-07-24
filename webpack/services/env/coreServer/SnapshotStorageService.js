
const tickSnapshots = {};


function saveSnapshot(snapshot){
	
	tickSnapshots[currTick] = this; // note: this will eventually clog the poo out of memory if we're not careful!!!!
	
}