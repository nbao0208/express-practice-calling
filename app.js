var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('./src/config/databaseConfiguration');
const jwtAuthenticationFilter = require('./src/middlewares/JWTAuthenticationFilter');
const assureTokenFilter = require('./src/middlewares/assureTokenFilter');
const loggingFilter = require('./src/config/loggingFilter');

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const authRouter = require('./src/routes/auth');
const testRouter = require('./src/routes/testRoute');

const domain = '/api/v1'
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(loggingFilter);
app.use(domain + '/auth', authRouter);

app.use(jwtAuthenticationFilter.authenticate('jwt', {session: false}));
app.use(domain + '/index', indexRouter);
app.use(domain + '/user', usersRouter);

app.use(assureTokenFilter);

app.use(domain + '/test', testRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
