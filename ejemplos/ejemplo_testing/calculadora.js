
function Calculadora () {}

Calculadora.prototype.sum = function (a = 0, b = 0) {
    return a + b;
};

Calculadora.prototype.sumAfter = function (a, b, ms, callback) {
    setTimeout(() => {
        const result = this.sum(a, b);
        callback(result);
    }, ms);
};

module.exports = Calculadora;