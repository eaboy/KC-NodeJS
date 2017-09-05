'use strict';

// constructor de objetos

function Coche(ruedas) {
    this.ruedas = ruedas;
    this.cuantasRuedas = function() {
        console.log(`Tiene ${this.ruedas} ruedas.`);
    }
}

const todoterreno = new Coche(4);

todoterreno.cuantasRuedas();

const funcion1 = todoterreno.cuantasRuedas;

//funcion1(); // Perdemos el this al no haber ningú todoterreno a la izquierda de la función
funcion1.call(todoterreno);

setTimeout( todoterreno.cuantasRuedas.bind(todoterreno), 1000);// Con bind le pasamos el this para que esa función siempre tenga su this asociado