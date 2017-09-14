'use stric';

const mongoose = require('mongoose');

// definir un esquema

const agenteSchema = mongoose.Schema({
    name: {
        type: String,
        index: true // Crea un índice para este campo para que las búsquedas por este campo sean mucho más rápidas
    },
    age: Number
});

// Añadimos método estático

agenteSchema.statics.list = function(filter, skip, limit){

    const query = Agente.find(filter);
    query.skip(skip);
    query.limit(limit);
    return query.exec(); // Ejecutamos la consulta
};

// crear el modelo

const Agente = mongoose.model('Agente', agenteSchema);

// No es necesario exportar el modelo ya que mongoose ya lo conoce

module.exports = Agente;