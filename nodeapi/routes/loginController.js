'use strict';

const Usuario = require('../models/Usuario');
const i18n = require('../lib/i18nConfigure')('es');

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
        const hashedPassword = Usuario.hashPassword(password);

        const user = await Usuario.findOne({ email: email, password: hashedPassword });

        if(!user){
            // Mantenemos al usuario en esta página
            res.locals.error = i18n.__('Invalid credentials');
            res.locals.email = email; // Para que la vista tenga el email que me mandó
            res.render('login');
            return;
        }

        // el usuario está y coincide la password 
        // apuntamos el usuario en la sessión
        req.session.authUser = { _id: user._id };

        // y le mandamos a la home
        res.redirect('/');

    }

    logout(req, res, next){
        delete req.session.authUser;
        req.session.regenerate(async function(err){
            if(err) {
                return next(err);
            }
            else {
                res.redirect('/');
            }
        });
    }

}

module.exports = new LoginController();

