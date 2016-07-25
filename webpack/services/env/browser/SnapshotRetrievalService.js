'use strict';

// var request = require('superagent');
var http = require('http');

function retrieveThen(cb){

    // request
    //     .get(url)
    //     .end(function(err, res){
    //         if(err)throw(err);
    //         var data = JSON.parse(res.text);
    //         cb(data);
    //     });


    const options = {
        host: 'localhost',
        port: 4242,
        path: '/snapshot',
    }

    http.get(options, function(res){
        let str = '';
        res.on('data', function (chunk) {
            str += chunk;
        });
        res.on('end', function () {
            console.log('str',str);
            cb(JSON.parse(str));
        });
    });

}



module.exports = {
    retrieveThen: retrieveThen,
}