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

    const req = http.get(options, function(res){

        if (res.statusCode != 200) {
          console.log("non-200 response status code:");
          console.log(res.statusCode);
          console.log("for url:");
          console.log(url);
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
        console.log(e);
        console.log('');
        console.log('**PROBABLY SERVER JUST NOT STARTED YET; RETRYING IN 100ms**');
        console.log('');
        setTimeout(function(){
            retrieveThen(cb);
        },100);
    });

}



module.exports = {
    retrieveThen: retrieveThen,
}