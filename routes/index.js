var express = require('express');
var router = express.Router();


/* Index */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* Projects */
router.get('/projects', function(req, res, next) {
	res.render('index', { 
		title: 'Express',
		loggedin: req.session.authenticated  
	});
});


/* Companies */
router.get('/companies', function(req, res, next) {
  res.render('index', { title: 'Express' });
})


/* Contact */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Express' });
});


/* Log in */
router.get('/login', function(req, res, next) {
	if (req.session.authenticated ) {
		res.redirect('/projects');
	} else {
		res.render('login', { 
			title: 'Please Login', 
			loggedin: req.session.authenticated 
		});
		console.log('login: ', req.session.authenticated);
	}
});


// /* Contact */
// router.get('/logout', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


module.exports = router;
