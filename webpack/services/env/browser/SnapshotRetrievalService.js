'use strict';

var request = require('superagent');

function retrieveThen(cb){

    // const url = 'http://localhost:4242/snapshot';
    const url = 'http://127.0.0.1:4242/snapshot';

    request
        .get(url)
        .end(function(err, res){
            if(err)throw(err);
            var data = JSON.parse(res.text);
            cb(data);
        });
}

module.exports = {
    retrieveThen: retrieveThen,
}