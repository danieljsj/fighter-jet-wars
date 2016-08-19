///// THIS IS A PILE OF NOTHING.... 


function doSnapshotRetrieval(){
	const retrieveThen = require('./env/client/SnapshotRetrievalService').retrieveThen; // TODO: move to './client'
	const makeGD = require('./io/SnapshotService').makeGameDataFromSnapshot;
	
	retrieveThen(function(snapshot){
		serv.data = makeGD(snapshot);
	});
	setTimeout(doSnapshotRetrieval,snapshotRetrievalInterval);
}