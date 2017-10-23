'use strict';

const Usuario = require('../models/Usuario');

class LoginController {
    index(req, res, next) {
        res.locals.error = '';
        res.locals.email = '';
        res.render('login');
    }

    // POST /login
    async post(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email, password);

        const user = await Usuario.findOne({ email: email, password: password });

        console.log('user', user);

        res.locals.error = '';
        res.locals.email = email; // Para que la vista tenga el email que me mandó
        res.render('login');
    }


}

module.exports = new LoginController();

