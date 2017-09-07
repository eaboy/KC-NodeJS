'use strict';

const versionModulo = require('./versionModulo');
const fs = require('fs');
const async = require('async');

function versionModulos(callback) {

    // leer contenido de la carpeta node_modules

    fs.readdir('./node_modules', (err, lista) => {
        if(err){
            callback(err);
            return;
        }
        console.log(lista);

        // sacar nombre y versión de cada módulo

        async.concat(lista, function iterador(item, callbackIteracionEnCurso) {

            // excluimos la carpeta .bin y otros posibles ficheros ocultos

            if (item[0] === '.'){
                process.nextTick(() => { // no hacemos nada, y metemos la llamada en la siguiente vuelta del event lopo
                    callbackIteracionEnCurso(null);
                });     
                return;           
            }

            // ya tenemos el nombre del módulo, recogemos su versión

            versionModulo(item, (error, version) => {
                if(error) {
                    callbackIteracionEnCurso(error);
                    return;
                }
                // no ha fallado, devolvemos el nombre del módulo y la versión
                callbackIteracionEnCurso(null, {item, version});
            });

        }, callback);
    });
    
    // devolver la lista de módulos

}

versionModulos((err, listaModulos) => {
    if (err) {
        console.log('Ha habido un error', err);
        return;
    }
    console.log(listaModulos);
})