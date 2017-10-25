'use strict';

const amqplib = require('amqplib');

const url = process.env.AMQP_URL || 'amqp://bnubzmop:eqbjrN_ZWMXFVQJk8MLALlmjMhcIDTrQ@impala.rmq.cloudamqp.com/bnubzmop';

const connectionPromise = amqplib.connect(url).catch(err => {
    console.log('[AMQP]', err);
});

module.exports = connectionPromise;