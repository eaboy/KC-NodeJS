'use strict';

const express = require('express');
const router = express.Router();

// Le pediomos a mongoose que nos de el modelo de Agente

//const mongoose = require('mongoose');
//const Agente = mongoose.model('Agente');

// O si lo hemos exportado en el modelo lo requerimos directamente

const Agente = require('../../models/Agente');

router.get('/', (req, res, next) => {

    // recupera una lista de agentes

    Agente.find({}, (err, lista) => {
        if(err){
            console.log('Error', err);
            next(err); // llamamos a next y le pasamos un error para que retorne la página de error
            return;
        }

        res.json({ success: true, rows: lista});
    });

});

module.exports = router;