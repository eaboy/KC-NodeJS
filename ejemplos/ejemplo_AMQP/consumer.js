'use strict';

const connectionPromise = require('./connectAMQP');

const q = 'tareas';

// Consumidor

// IIFE inmediatelly invoked function expression
(async () => {

    const conn = await connectionPromise;

    // Conectamos a un canal

    const ch = await conn.createChannel();

    // Conecto a una cola

    await ch.assertQueue(q);

    // Le decimos a rabbitMQ cuantos mensajes puede darme en paralelo

    ch.prefetch(1); // RabbitMQ nos manda 1 mensaje cada vez, y no manda mas hasta que le digamos que hemos terminado de procesar el/los mensajes

    await ch.consume(q, function(msg) {
        
        console.log('Recibido:', msg.content.toString());
        // Procesamos el mensaje
        setTimeout(function() { // Simulamos un trabajo
            // Hemos terminado de procesar
            // Confirmamos a rabbit que está procesado
            ch.ack(msg); // Podemos decirle que no hemos podido procesar correctamente el mensaje -> ch.nack(msg)
        }, 500);
    });

})().catch(err => console.error(err));