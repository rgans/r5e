var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
var User = require('./security/user');

var app = express();

app.set("x-powered-by", false);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'r5egso0536', saveUninitialized:false, resave:false, store: new MongoStore({ url: 'mongodb://localhost/r5e' })}));

app.use(function loadUser(req, res, next) {
  req.session.user = req.session.user || new User();
  req.user = app.locals.user = req.session.user;
  console.log(req.user);
  next();
});

//register routes
[
    { path: '/', controller: require('./routes/index') },
    { path: '/admin', controller: require('./routes/admin') },
    { path: '/service', controller: require('./routes/service') },
    { path: '/reservation', controller: require('./routes/reservation') },
    { path: '/event', controller: require('./routes/event') },
    { path: '/gallery', controller: require('./routes/gallery') },
    { path: '/location', controller: require('./routes/location') },
    { path: '/newsletter', controller: require('./routes/newsletter') },
    { path: '/message', controller: require('./routes/message') },
    { path: '/about', controller: require('./routes/about') }
].forEach(function(r){
    app.use(r.path, r.controller);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
