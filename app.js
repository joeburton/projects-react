const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./routes/routes');
const api = require('./routes/api');

const config = require('config');

// set static file directory
const staticFileDir = (config.env === 'prod') ? 'public' : 'app';

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'ssshhhhh',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/populate-database', api.populateDatabase); // populate database

app.use(routes(config));

console.log(config, staticFileDir);

app.get('/source', api.findAll); // get all projects
app.get('/source/:id', api.findById); // get project by id
app.post('/addproject', api.addProject); // add addproject
app.post('/addcompany', api.addCompany); // add addcompany
app.post('/updateproject', api.updateProject); // update project
app.post('/deleteproject', api.deleteProject); // delete project or company

app.post('/auth', api.auth); // login
app.get('/logout', api.logout); // logout

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
