'use strict';

const versionModulo = require('./versionModulo');

versionModulo('chance', (error, version) => {
    if(error) {
        console.log('Hubo un error', error);
        return;
    }
    console.log('La versión del múdulo chance es', version);
});