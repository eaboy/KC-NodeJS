'use strict';

// funciones que devuelven promesas

function conArroz(plato) {
    return new Promise((resolve, reject) => {
        resolve(plato + ' arroz');
    });
}

function conAjo(plato) {
    return new Promise((resolve, reject) => {
        resolve(plato + ' ajo');
    });
}

function con(plato, ingrediente) {
    return new Promise((resolve, reject) => {
        resolve(plato + ' ' + ingrediente);
    });
}

const paella = 'paella con';

conArroz(paella)
    .then(conAjo)
    .then((plato) => {
        return con(plato, 'conejo');
    })
    .then((plato) => {
        console.log(plato);
}).catch((err) => { // Un solo catch vale para capturar los errores de cualquier promesa
    console.log('Error', err);
});