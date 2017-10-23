'use strict';

module.exports = function() { // Devuelve un middleware que si no hay usuario redirie al login
    return function(req, res, next){
        if (!req.session.authUser){
            // Redirigimos al login
            res.redirect('/login');
            return;
        }
        // El usuario está autenticado así que continua la ejecución del app
        next()
    };
}