module.exports = function (config) {
  var express = require("express");
  var router = express.Router();

  /* Index */
  router.get("/", function (req, res, next) {
    res.render("index", {
      loggedin: req.session.authenticated,
      config: config,
    });
  });

  /* Projects */
  router.get("/projects", function (req, res, next) {
    res.render("index", {
      loggedin: req.session.authenticated,
      config: config,
    });
  });

  /* Companies */
  router.get("/companies", function (req, res, next) {
    res.render("index", {
      loggedin: req.session.authenticated,
      config: config,
    });
  });

  /* Contact */
  router.get("/contact", function (req, res, next) {
    res.render("contact", {
      loggedin: req.session.authenticated,
      config: config,
    });
  });

  /* Log in */
  // router.get('/login', function (req, res, next) {
  //     if (req.session.authenticated) {
  //         res.redirect('/projects');
  //     } else {
  //         res.render('/', {
  //             loggedin: req.session.authenticated
  //         });
  //     }
  // });

  return router;
};
