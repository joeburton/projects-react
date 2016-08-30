var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET projects. */
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET companies. */
router.get('/companies', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

/* GET companies. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});

module.exports = router;
