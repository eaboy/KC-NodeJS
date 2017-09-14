'use strict';

// función que retorna una promesa

function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

const promesa = sleep(2000);

promesa.then(() => {
    // la promesa se ha cumplido
    console.log('Cumplido');
}).catch((err) => {
    // la promesa ha fallado
    console.log('Error', err);
});