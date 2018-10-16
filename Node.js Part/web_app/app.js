var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var signin2 = require ('./routes/signin2');
var UserPage = require ('./routes/userpage');
var signin = require ('./routes/signin');
var signup = require ('./routes/signup');
var newschedule = require('./routes/newschedule');
var schedule = require('./routes/schedule');
var schedule2 = require('./routes/schedule2');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(session({secret: 'R!ck0_D!@s_24'}));

app.use('/', routes);
app.use('/users', users);
app.use('/userpage', UserPage);
app.use('/signin', signin);
app.use('/signin2', signin2);
app.use('/signup', signup);
app.use('/newschedule', newschedule);
app.use('/schedule', schedule);
app.use('/schedule2', schedule2);
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
