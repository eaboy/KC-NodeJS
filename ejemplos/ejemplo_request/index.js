'use stric';

const request = require('request');

request({
    url: 'https://swapi.co/api/planets/1',
    json: true
}, (err, resp, body) => {
    if(err || resp.statusCode >= 400) {
        console.log('Error', err);
        return;
    }
    console.log(body);
});
