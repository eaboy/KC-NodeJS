'use strict';

// definimos un constructor de objetos

function Persona(nombre) {
    this.nombre = nombre;
}

// construimos un objeto

const pepe = new Persona('Pepe');

// añadimos propiedades al prototipo de las personas
Persona.prototype.saluda = function() {
    console.log(`Hola me llamo ${this.nombre}`);
}

pepe.saluda();

// Herencia simple de persona -----------------------------

function Agente(nombre){
    // Ejecutamos el constructor de personas con mi this
    Persona.call(this, nombre); // Sería como ejecutar Persona(nombre) con el this de aquí
}

// Heredamos sus propiedades y métodos

Agente.prototype = new Persona('soy un prototipo');

const smith = new Agente('Smith');

smith.saluda();

// Herencia múltiple de persona -----------------------------

// Mixin Superhéroe

function Superheroe() {
    this.vuela = function() {
        console.log(this.nombre, 'vuela');
    }
    this.esquivaBalas = function() {
        console.log(this.nombre, 'esquiva balas');
    }
}

// Copiamos todas las propiedades de superhéroe al prototipo de Agente
Object.assign(Agente.prototype, new Superheroe());

smith.vuela();
smith.esquivaBalas();