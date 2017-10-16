const Calculadora = require('./calculadora');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

describe('calculadora', function () {

    let calculadora;

    beforeEach(function () {
        calculadora = new Calculadora();
    });

    it('sum() should return 0 if no arguments are passed in', function () {
        expect(calculadora.sum()).to.equal(0);
    });

    it('sum() should return the sum of 10 and 15', function () {
        expect(calculadora.sum(10, 15)).to.equal(25);
    });

    it('sumAfter() should execute callback function with the result', function (done) {
        // this.timeout(4000); le indica a mocha que debe esperar 4 segundos a que termine el test en vez de los 2 por defecto
        // Hacer mock de sum para que no dependa de el con sinon
        sinon.stub(calculadora, 'sum').returns(20);
        calculadora.sumAfter(10, 10, 10, result => {
            expect(result).to.be.not.undefined;
            calculadora.sum.restore(); // Limpiamos el stub
            done();
        });
    });

    it('sumAfter() should call sum() to obtain the result', function (done) {
        // this.timeout(4000); le indica a mocha que debe esperar 4 segundos a que termine el test en vez de los 2 por defecto
        // Hacer mock de sum para que no dependa de el con sinon
        sinon.stub(calculadora, 'sum').returns(20);
        calculadora.sumAfter(10, 10, 10, result => {
            expect(calculadora.sum.firstCall.args).to.deep.equal([10, 10]);
            calculadora.sum.restore(); // Limpiamos el stub
            done();
        });
    });

});