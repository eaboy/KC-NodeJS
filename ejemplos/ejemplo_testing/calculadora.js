
function Calculadora () {}

Calculadora.prototype.sum = function (a = 0, b = 0) {
    return a + b;
};

module.exports = Calculadora;