'use strict';

function Calculadora () {}

Calculadora.prototype.operators = ['+','-', '*'];

Calculadora.prototype.sum = function (a = 0, b = 0) {
    return a + b;
};

Calculadora.prototype.sumAfter = function (a, b, ms, callback) {
    setTimeout(() => {
        const result = this.sum(a, b);
        callback(result);
    }, ms);
};

Calculadora.prototype.subtract = function(a, b) {
    return a - b;
};

Calculadora.prototype.parse = function(expression) {
    const result = [];
    for (const [index, item] of expression.split(' ').entries()) {
        if (this.operators.includes(item)) {
            // Si es una posición par lanzo una excepción
            if(index % 2 === 0){
                throw new TypeError(`Unexpected item ${item} found`);
            }
            result.push(item);
        } else {
            const number = Number(item);
            if(isNaN(number)){
                throw new TypeError(`Unknown item ${item} found`);
            }
            if(index % 2 !== 0){
                throw new TypeError(`Unexpected item ${item} found`);
            }
            result.push(number);
        }
    }
    return result;
};

Calculadora.prototype.eval = function(expression) {
    let operador = null;
    let resultado = null;
    for(const item of this.parse(expression)) {
        // Si es un operador lo guardamos y pasamos al siguiente
        if (this.operators.includes(item)) {
            operador = item;
            continue;
        }
        // Si es un número, si es el primero lo guardo en el resultado
        if (resultado === null){
            resultado = item;
            continue;
        }
        // Si no es el primer número, hago la operación guardada
        switch (operador) {
            case '+': resultado += item; break;        
            case '-': resultado -= item; break;
            case '*': resultado *= item; break;
            default: throw new TypeError(`Unknown operator ${operador}`);
        }
        operador = null;
    }
    return resultado;
};

module.exports = Calculadora;