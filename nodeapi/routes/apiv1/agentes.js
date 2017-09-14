'use strict';

const express = require('express');
const router = express.Router();

// Le pediomos a mongoose que nos de el modelo de Agente

//const mongoose = require('mongoose');
//const Agente = mongoose.model('Agente');

// O si lo hemos exportado en el modelo lo requerimos directamente

const Agente = require('../../models/Agente');


// GET /
router.get('/', (req, res, next) => {

    const name = req.query.name;
    const age = req.query.age;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);

    const filter = {};

    if(name) {
        filter.name = name;
    }
    
    if(age) {
        filter.age = age;
    }

    // recupera una lista de agentes

    Agente.list(filter, skip, limit).then(lista => { 
        res.json({ success: true, rows: lista});
    }).catch( err => {
        console.log('Error', err);
        next(err); // llamamos a next y le pasamos un error para que retorne la página de error
        return;
    });
    
});

// GET /:id
router.get('/:id', (req, res, next) => {

    // recupera un solo agente

    const _id = req.params.id;

    Agente.findOne({ _id: _id }, (err, agente) => {
        if(err){
            console.log('Error', err);
            next(err); // llamamos a next y le pasamos un error para que retorne la página de error
            return;
        }

        res.json({ success: true, row: agente});
    });

});

// POST /
// Crea un agente

router.post('/', (req, res, next) => {
    console.log(req.body);
    // creamos un nuevo agente  y lo guardamos en la base de datos
    const agente = new Agente(req.body);
    agente.save((err, agenteGuardado) => {
        if(err) {
            console.log('Error', err);
            next(err);
            return;
        }
        res.json({ success: true, result: agenteGuardado});
    });
});

// PUT /
// Actualiza un agente

router.put('/:id', (req, res, next) => {
    console.log(req.body);
    // buscamos el agente a editar y lo guardamos en la base de datos
    const _id = req.params.id;
    Agente.findOneAndUpdate({_id: _id}, req.body, {new:true}, (err, agenteActualizado) => { // Usamos new: true para que el resultado que devuelva sea el documento actualizado
        if(err) {
            console.log('Error', err);
            next(err);
            return;
        }
        res.json({ success: true, result: agenteActualizado});
    });
});

// DELETE /
// Borra un agente

router.delete('/:id', (req, res, next) => {
    console.log(req.body);
    // buscamos el agente a borrar y lo borramos
    const _id = req.params.id;
    Agente.remove({_id: _id}, (err) => { // Usamos new: true para que el resultado que devuelva sea el documento actualizado
        if(err) {
            console.log('Error', err);
            next(err);
            return;
        }
        res.json({ success: true });
    });
});

module.exports = router;