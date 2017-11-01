'use strict';

const jwt = require('jsonwebtoken');

module.exports = function() { // Devuelve un middleware que si no hay usuario responde con error
    return function(req, res, next){
        const token = req.body.toket || req.query.token || req.get('x-access-token');
        if (!token){
            // Respondemos con error
            const err = new Error('no token provided');
            next(err);
            return;
        }
        // tengo token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                return next(err);
            }
            // Guardo el id del usuario en request para que los siguientes middlewares puedan usarlos
            req.userId = decoded._id;
            next();
        });

    };
}