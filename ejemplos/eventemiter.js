'use strict';

const EventEmitter = require('events');

// creamos un emisor de eventos

const emisor = new EventEmitter();

// nos suscribimos al evento

emisor.on('suena el telefono', (quien) => {
    if(quien === 'madre'){
        return;
    }
    console.log('ring ring');
})

emisor.once('suena el telefono', () => {
    console.log('brrr brrr');
})

// emitimos el evento

emisor.emit('suena el telefono', 'madre');
emisor.emit('suena el telefono');