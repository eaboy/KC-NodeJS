const Calculadora = require('./calculadora');
const chai = require('chai');
const expect = chai.expect;

describe('calculadora', function() {

    let calculadora;

    beforeEach(function() {
        calculadora = new Calculadora();
    });

    it('sum() should return 0 if no arguments are passed in', function() {
        expect(calculadora.sum()).to.equal(0);
    });

    it('sum() should return the sum of 10 and 15', function() {
        expect(calculadora.sum(10,15)).to.equal(25);
    });
});