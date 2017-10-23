'use strict';

const mongoose = require('mongoose');

// Le decimos a mongoose que librería de promesas usar para quitar un deprecation warning
mongoose.Promise = global.Promise;

const conn = mongoose.connection;

conn.on('error', err => {
    console.log('Error de conexión', err);
    process.exit(1);
});

conn.once('open', () => {
    console.log('Conectado a MongoDB en', mongoose.connection.name);
});

// la cadena de conexión es como una url pero con protocolo mongodb
mongoose.connect('mongodb://localhost/cursonode', {
    useMongoClient: true // Para que no salga el DeprecationWarning
});

// No necesitamos exportar la conexión ya que mongoose se encarga de mantenerla internamente