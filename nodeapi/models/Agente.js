'use stric';

const mongoose = require('mongoose');

// definir un esquema

const agenteSchema = mongoose.Schema({
    name: String,
    age: Number
});

// crear el modelo

const Agente = mongoose.model('Agente', agenteSchema);

// No es necesario exportar el modelo ya que mongoose ya lo conoce

module.exports = Agente;