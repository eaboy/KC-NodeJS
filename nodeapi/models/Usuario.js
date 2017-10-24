'use strict';

const mongoose = require('mongoose');
const hash = require('hash.js');
const nodemailer = require('nodemailer');
const tranporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: process.env.SENDGRID_USER,
        pass: process.env.SENDGRID_PASSWORD
    }
})

const usuarioSchema = mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String
});

usuarioSchema.statics.hashPassword = function(plain){
    return hash.sha256().update(plain).digest('hex');
}

// Método de instancia
usuarioSchema.methods.sendEmail = async function(){
    await tranporter.sendMail({
        to: this.email,
        from: 'NodeAPI <admin@nodeapi.com>',
        subject: 'New products',
        text: 'There are new products!'
    });
};

var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;