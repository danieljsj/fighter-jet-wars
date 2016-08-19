


module.exports = {
	simulation: null,
}





///// THIS IS A PILE OF NOTHING.... 
// NOTHING

function doSnapshotRetrieval(){
	const retrieveThen = require('./env/client/SnapshotRetrievalService').retrieveThen; // TODO: move to './client'
	const makeGD = require('./SnapshotService').makeGameDataFromSnapshot;
	
	retrieveThen(function(snapshot){
		serv.data = makeGD(snapshot);
	});
	setTimeout(doSnapshotRetrieval,snapshotRetrievalInterval);
}