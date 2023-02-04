var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./src/routes/index');
var globalPriceIndex = require('./src/routes/globalPriceIndex');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/GlobalPriceIndex', globalPriceIndex);

// catch 404 and forward to error handler
app.use(function(req : any, res : any, next : any) {
  next(createError(404));
});

// error handler
app.use(function(err : any, req : any, res : any, next : any) {
  // set locals, only providing error in development
  // console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
