'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon =  require('sinon');

const hola = require('./hola');

describe('router hola', function() { // Paquete de pruebas 
    describe('GET del index', function(){
        it('should render hola page', function(){
            const res = { render: sinon.spy() }; // Ponemos un espía en res.render para ver si es llamado desde hola.index
            hola.index({}, res, null);
            expect(res.render.callCount).to.equal(1);
        });
    });

});