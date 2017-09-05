'use strict';

// crear una función como constructor de objetos

function Fruta(nombre){
    // this será el objeto que se va a crear
    this.nombre = nombre;

    this.setNombre = (valor) => {
        this.nombre = valor;
    }
}

// crear un objeto con el constructor
 const limon = new Fruta('limon');

 limon.setNombre('naranja');

 console.log(limon.nombre);

 const objetoSerializado = JSON.stringify(limon);

 console.log(objetoSerializado);