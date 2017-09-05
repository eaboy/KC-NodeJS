'use strict';

console.log('Inicializo el módulo calculadora');

function suma(a, b) {
    return a + b;
}

function resta(a, b) {
    return a - b;
}

module.exports = {
    suma: suma,
    resta: resta
};  //exportamos solo una función