var express = require('express');
var router = express.Router();
const i18n = require('i18n');

const { query, validationResult} = require('express-validator/check'); // Desestructuración

/* GET home page. */
router.get('/', function(req, res, next) {

  const segundo = new Date().getSeconds();
  res.render('index', { 
    title: 'Express',
    valor: `<script>alert("${__('Envía un bitcoin para limpiar tu navegador')}")</script>`,
    condicion: {
      segundo: segundo,
      estado: segundo % 2 === 0
    },
    users: [
        { name: 'Jones', age: 29},
        { name: 'Smith', age: 48},
        { name: 'Brown', age: 33}
      ],
   });
});

router.get('/lang/:locale', (req, res, next) => {
  const locale = req.params.locale;
  const referer = req.get('referer');
  res.cookie('nodeappi-lang', locale, {maxAge: 900000, httpOnly: true});
  res.redirect(referer);
});

// recibimos parámetros en la ruta

router.get('/ruta/:algo', (req, res, next) => { // podemos poner '/ruta/:algo? y el parámetro sería opcional
  console.log('parametro en ruta',req.params);
  res.send('Ok ' + req.params.algo);
});

router.get('/calle/:calle/numero/:numero([0-9]+)/piso/:piso?/puerta/:puerta(a|b|c)', (req, res, next) => {
  console.log('parametro en ruta',req.params);
  res.send('Ok ');
});

router.get('/query', (req, res, next) => {
  console.log('parámetro en query string', req.query);
  res.send('Ok');
});

router.post('/ruta', (req, res, next) => {
  console.log('Parámetro en body', req.body);
  res.send('ok');
});

// validaciones

router.get('/querystring', [
  query('age').isNumeric().withMessage('La edad debe de ser un número')
], (req, res, next) => {
  validationResult(req).throw();
  console.log('req.query', req.query);
  res.send('ok');
});

module.exports = router;
