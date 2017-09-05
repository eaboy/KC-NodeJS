'use strict';

// creamos un objeto con closures

function creaAgente(nombre) {
    return {
        getNombre: function() {
            // siempre tendré acceso al contexto que tenía creaAgente cuando me crearon
            return nombre;
        },
        setNombre: function(valor) {
            nombre = valor;
        },
        saluda: function() {
            console.log(`Hola, soy el agente ${nombre}`);
        }
    };
}

const brown = creaAgente('Brown');

brown.saluda();