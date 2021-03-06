var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const i18n = require('./lib/i18nConfigure')('es');
const session = require('express-session');
const sessionAuth = require('./lib/sessionAuth');
const jwtAuth = require('./lib/jwtAuth');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config();// Inicializamos variables de entorno en el fichero .env

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Conexión a la base de datos
require('./lib/connectMongoose');
require('./models/Agente');  
require('./models/Usuario');

app.use(function(req, res, next){
  //console.log('He recibido una petición');
  next();
});
if (process.env.LOG_FORMAT !== 'nolog'){
  app.use(logger(process.env.LOG_FORMAT || 'dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(i18n.init); // Para inferir el locale actual desde el request

console.log(i18n.__('HELLO'));
console.log(i18n.__('HOME.TITLE'));
console.log(i18n.__('The name is name and the age is age', {
  name: 'Javier',
  age: 33
}));
console.log(i18n.__n('Mouse', 1));
console.log(i18n.__n('Mouse', 2));

app.use('/apiv1/agentes', jwtAuth(), require('./routes/apiv1/agentes'));

// Catch api 404
app.use('/apiv1', function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Middleware de control de sesiones, las rutas por encima no pasan por el control de sesiones por lo que no necesitan autenticación

app.use(session({
  secret: 'klljsldkjf s dfkljlsdf lkj sldfkj l jjjjk',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 2 * 24 * 3600 * 1000 }, // Dos días de duración de la cookie
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    autoReconnect: true,
    clear_interval: 3600
  })
}));

const loginController = require('./routes/loginController');

// Usamos las rutas de un controlador
app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.post('/loginjwt', loginController.postLoginJWT);
app.get('/logout', loginController.logout)

app.use(sessionAuth()); // todos los siguientes middlewares pasan por el sessionAuth

app.use('/', sessionAuth(), require('./routes/index'));// Esta ruta pasaría por el sessionAuth
app.use('/hola', require('./routes/hola').router);

app.use('/users', require('./routes/users'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  if (err.array) { // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = isAPI(req) ?
    { message: 'Not valid', errors: err.mapped()}
    : `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }

  res.status(err.status || 500);

  // Si es una petición api respondo con json...

  if (isAPI(req)) {
    res.json({ success: false, error: err.message });
    return;
  }  

  // Si no respondo con html

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function isAPI(req) {
  return req.originalUrl.indexOf('/api') === 0;
}

module.exports = app;
