var express = require('express');
var createError = require('http-errors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var events = require('./routes/event');
var app = express();

var mongoose = require('mongoose');
var dbUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/reminder'; 
mongoose.Promise = require('bluebird');
mongoose.connect(dbUrl, { useNewUrlParser: true, promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.user( favicon );
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/events', express.static(path.join(__dirname, 'dist')));
app.use('/api/events', events);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err.status);
});

module.exports = app;
