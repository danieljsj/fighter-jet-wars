'use strict';

const ToLog = require('../../ToLog');
// var request = require('superagent');
const http = require('http');

function retrieveThen(cb){

    // request
    //     .get(url)
    //     .end(function(err, res){
    //         if(err)throw(err);
    //         var data = JSON.parse(res.text);
    //         cb(data);
    //     });


    if (ToLog.snapshots) console.log('requesting snapshot');

    const options = {
        host: 'localhost',
        port: 4242,
        path: '/snapshot',
    }

    const req = http.get(options, function(res){

        if (res.statusCode != 200) {
          console.error("non-200 response status code:");
          console.error(res.statusCode);
          return;
        }

        let str = '';
        res.on('data', function (chunk) {
            str += chunk;
        });
        res.on('end', function () {
            cb(JSON.parse(str));
        });
    });

    req.on('error', function(e){
        console.log('**HTTP ERROR IS PROBABLY "ECONNREFUSED"; PROBABLY SERVER JUST NOT STARTED YET; RETRYING IN 100ms**');
        setTimeout(function(){
            retrieveThen(cb);
        },100);
    });

}



module.exports = {
    retrieveThen: retrieveThen,
}