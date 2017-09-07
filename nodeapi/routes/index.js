var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hola', (req, res, next) => {
  res.render('hola');
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

module.exports = router;
