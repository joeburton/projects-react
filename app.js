var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/routes');
var api = require('./routes/api');

var app = express();

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

app.use(routes);

app.get('/source', api.findAll); // get all projects
app.get('/source/:id', api.findById); // get project by id
app.post('/addproject', api.addProject); // add addproject
app.post('/addcompany', api.addCompany); // add addcompany
app.post('/updateproject', api.updateProject); // update project
app.post('/devareproject', api.devareProject); // devare project or company

app.post('/auth', api.auth); // login
app.get('/logout', api.logout); // logout



// define paths
var appPaths = {
    js: path.resolve('js'),
    css: path.resolve('css'),
    images: path.resolve('img')
};

app.use('js', express.static(appPaths.js));
app.use('css', express.static(appPaths.css));
app.use('images', express.static(appPaths.images));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
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
