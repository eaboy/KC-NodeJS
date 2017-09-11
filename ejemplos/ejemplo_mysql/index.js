'use strict';

// cargamos el driver mysql

const mysql = require('mysql');

// creamos una conexión 

const connection = mysql.createConnection({
    host:'didimo.es',
    user: 'usuariocurso',
    password: 'us3r',
    database: 'cursonode'
});

// conectamos

connection.connect();

// lanzamos una query

connection.query('SELECT * FROM agentes', (err, rows, fields) => {

    if(err) {
        console.log('Hubo un error', err);
        process.exit(1);
        return;
    }

// pintamos los resultados

    for(let i = 0 ; i < rows.length ; i++ ) {
        const agente = rows[i];
        console.log(agente.idagentes, agente.name, agente.age);        
    }
});
