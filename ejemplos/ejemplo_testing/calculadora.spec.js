'use strict';

const Calculadora = require('./calculadora');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const rewire = require('rewire');
const Calculadora2 = rewire('./calculadora.js');
const nock = require('nock');

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
        // Hacer mock de sum para que no dependa del método sum con sinon
        sinon.stub(calculadora, 'sum').returns(20);
        calculadora.sumAfter(10, 10, 10, result => {
            expect(calculadora.sum.firstCall.args).to.deep.equal([10, 10]);
            calculadora.sum.restore(); // Limpiamos el stub
            done();
        });
    });

    it('sum(10,15) should be equal to sum(15,10)', function (){
        expect(calculadora.sum(10,15)).to.equal(calculadora.sum(15,10));
    });

    it('subtract() should subtract', function(){
        expect(calculadora.subtract(20,5)).to.equal(15);
    });
    
    it('subtract() should not have commutative property', function(){
        const result1 = calculadora.subtract(20,5);
        const result2 = calculadora.subtract(5,20);
        expect(result1).to.be.not.equal(result2);
    });

    it('parse() should decompose expresion and returns array', function(){
        expect(calculadora.parse('4 + 6')).to.deep.equal([4,'+',6]);
    });
    
    it('parse() should decompose expresion and returns other array', function(){
        expect(calculadora.parse('5 + 8')).to.deep.equal([5,'+',8]);
    });

    it('parse() should decompose expression 1 + 2 + 3', function(){
        expect(calculadora.parse('1 + 2 + 3')).to.deep.equal([1,'+',2,'+',3]);
    }); 
    
    it('parse() should decompose expresion and returns array', function(){
        expect(calculadora.parse('1 - 6')).to.deep.equal([1,'-',6]);
    });

    it('parse() should throw exception with two operators together', function() {
        const throwingFunction = calculadora.parse.bind(calculadora, '1 + - 6');
        // expect(() => calculadora.parse('1 + - 6')).to.throw(); una opción para pasar una función al expect
        expect(throwingFunction).to.throw('Unexpected item - found');
    });

    it('parse() should throw exception with characters different to numbers or operators', function() {
        expect( () => calculadora.parse('1 + A')).to.throw('Unknown item A found');
    });
    
    it('parse() should throw exception with two numbers together', function() {
        expect(() => calculadora.parse('1 - 6 3')).to.throw('Unexpected item 3 found');
    });

    it('parse() should write result to log', function() {
        sinon.spy(calculadora, 'log');
        calculadora.parse('1 + 2');
        expect(calculadora.log.callCount).to.equal(1);
        calculadora.log.restore();// Minuto 21:10
    });

    describe('eval()', function(){


        it('eval() should compute 6 + 7', function() {
            sinon.stub(calculadora, 'parse').callsFake(() => {
                return [6, '+', 7];
            });
            expect(calculadora.eval('6 + 7')).to.equal(13);
            calculadora.parse.restore();
        });
        
        it('eval() should compute 3 + 4 + 1', function() {
            sinon.stub(calculadora, 'parse').callsFake(() => {
                return [3, '+', 4, '+', 1];
            });
            expect(calculadora.eval('3 + 4 + 1')).to.equal(8);
            calculadora.parse.restore();
        });
        
        it('eval() should compute 3 + 4 - 1', function() {
            sinon.stub(calculadora, 'parse').callsFake(() => {
                return [3, '+', 4, '-', 1];
            });
            expect(calculadora.eval('3 + 4 - 1')).to.equal(6);
            calculadora.parse.restore();
        });
        
        it('eval() should compute 3 + 4 * 5', function() {
            sinon.stub(calculadora, 'parse').callsFake(() => {
                return [3, '+', 4, '*', 5];
            });
            expect(calculadora.eval('3 + 4 * 5')).to.equal(35 );
            calculadora.parse.restore();
        });
    
    });

    it('sumaPromise() should return promise', function(){
        expect(calculadora.sumaPromise(1,5)).to.be.a('promise');
    });
    
    it('sumaPromise() should resolve to sum of 4 + 5', function(done){
        calculadora.sumaPromise(4,5).then( res => {
            expect(res).to.equal(9);
            done();
        });
    });

    it('sumaPromise() can be used with async await', async function(){
        const result = await calculadora.sumaPromise(8,12);
        expect(result).to.equal(20);
    });

    it('fileHeader() should read a file first line', function(done){
        Calculadora2.__set__('fs', {
           readFile(file, callback) {
               callback(null, 'Primera línea\nSegunda linea');
           } 
        });
        const calculadora = new Calculadora2();
        calculadora.fileHeader('zzz.xy', function(err, result) {
            expect(result).to.equal('Primera línea');
            done();
        });
    });

    it('httpGetName() should use network request to obtain name', async function(){
        nock('https://swapi.co')
            .get('/api/people/1/')
            .reply(200, {
                name: 'FakeName'
            });
        const nombre = await calculadora.httpGetName();
        expect(nombre).to.equal('FakeName');
       // done();
    });

    // xit hace que el test no se compruebe
    // it.only hace que solo se evalue ese test

});