let express = require('express');
let router = express.Router();


/* Index */
router.get('/', function(req, res, next) {
  res.render('index', { 
		loggedin: req.session.authenticated  
	});
});


/* Projects */
router.get('/projects', function(req, res, next) {
	res.render('index', { 
		loggedin: req.session.authenticated  
	});
});


/* Companies */
router.get('/companies', function(req, res, next) {
	res.render('index', { 
		loggedin: req.session.authenticated  
	});
})


/* Contact */
router.get('/contact', function(req, res, next) {
  res.render('contact', { 
		loggedin: req.session.authenticated  
	});
});


/* Log in */
router.get('/login', function(req, res, next) {
	if (req.session.authenticated ) {
		res.redirect('/projects');
	} else {
		res.render('login', { 
			loggedin: req.session.authenticated 
		});
	}
});

module.exports = router;
