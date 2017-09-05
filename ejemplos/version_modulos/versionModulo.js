'use strict';

const fs = require('fs');
const path = require('path');

// Crear una función que lea el contenido de un módulo en node_modules y devuelva su versión

function versionModulo(nombreModulo, callback) {
    console.log('Cargando módulo', nombreModulo);

    // creamos la ruta al fichero

    const fichero = path.join('.', 'node_modules', nombreModulo, 'package.json');

    fs.readFile(fichero, 'utf8' ,(err, data) => {
        if (err){
            callback(err);
            return;
        }
        // Parseamos data construyendo un objeto

        const packageInfo = JSON.parse(data);

        callback(null, packageInfo.version);
    });
}

module.exports = versionModulo;