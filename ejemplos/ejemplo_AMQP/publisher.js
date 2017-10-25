'use strict';

const connectionPromise = require('./connectAMQP');

const q = 'tareas';

// Publicador

// IIFE inmediatelly invoked function expression
(async () => {

    const conn = await connectionPromise;

    // Conectamos a un canal

    const ch = await conn.createChannel();

    // Conecto a una cola

    await ch.assertQueue(q, {
        durable: true // La cola sobrevive a reinicios 
    });

    // Mandamos un mensaje
    setInterval(() => {
        const mensaje = {
            tarea: 'tarea ' + Date.now()
        };
        const res = ch.sendToQueue(q, new Buffer(JSON.stringify(mensaje)), {
            persistent: true // para que el mesaje no se borre si hay un reinicio
        });
        console.log(`publicado: ${res} - ${mensaje.tarea}`);
    },100);

})().catch(err => console.log(err));
