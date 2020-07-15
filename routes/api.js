// Mongo objects
var MongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
var config = require("config");

// API
var production = config.env === "production" ? true : false;
var url;
var _db;
var sess;

// Connection URL
if (production) {
  // production
  url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-dhtvx.mongodb.net/directory?retryWrites=true&w=majority`;
} else {
  // local dev
  url = "mongodb://127.0.0.1:27017/companies";
}

console.log(config.env, url);

// Use connect method to connect to the Server
MongoClient.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    console.log("MongoDB Connected");
    _db = client.db("companies");
  }
);

// login
exports.auth = function (req, res) {
  _db.collection("users", function (err, collection) {
    console.log(req.body.username);

    collection.findOne({ username: req.body.username }, function (err, user) {
      if (user && user.password === req.body.password) {
        console.log("Login Successful.");
        sess = req.session;
        sess.username = req.body.username;
        sess.password = req.body.password;
        sess.authenticated = true;
        res.redirect("/projects");
      } else {
        console.log("Login Failed.");
        res.redirect("/");
      }
    });
  });
};

// logout
exports.logout = function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successful logout");
      res.redirect("/");
    }
  });
};

// get all projects in the collection
exports.users = function (req, res) {
  if (req.session.authenticated) {
    var collection = _db.collection("users"),
      authenticated = req.session.authenticated ? true : false;

    collection.find().toArray(function (err, users) {
      console.log(users);
      res.write(
        JSON.stringify({
          users: users,
          authorised: authenticated,
        })
      );
      res.end();
    });
  } else {
    res.write(
      JSON.stringify({
        message: "You are not authorised. Get the Fu.... out!",
      })
    );
    res.end();
  }
};

// get all projects in the collection
exports.findAll = function (req, res) {
  var collection = _db.collection("projects"),
    authenticated = req.session.authenticated ? true : false;

  collection.find().toArray(function (err, projects) {
    // console.log(projects);
    res.write(
      JSON.stringify({
        projects: projects,
        authorised: authenticated,
      })
    );
    res.end();
  });
};

// get projects by id
exports.findById = function (req, res) {
  var id = req.params.id;

  console.log("Retrieving project: " + id);

  _db.collection("projects", function (err, collection) {
    collection.findOne({ _id: new ObjectId(id) }, function (err, item) {
      res.send(item);
    });
  });
};

// add project to an exisiting company set
exports.addProject = function (req, res) {
  if (req.session.authenticated) {
    var company = req.body,
      project = company.projects[0];

    project.id = new ObjectId();

    console.log(JSON.stringify(project));

    _db.collection("projects", function (err, collection) {
      collection.update(
        { _id: new ObjectId(company.id) },
        { $push: { projects: project } },
        { safe: true },
        function (err, result) {
          if (err) {
            console.log("Error updating project: " + err);
            res.send({ error: "An error has occurred" });
          } else {
            collection.find().toArray(function (error, projects) {
              res.write(JSON.stringify(projects));
              res.end();
            });
          }
        }
      );
    });
  } else {
    res.write(
      JSON.stringify({
        message: "You are not authorised to view this page",
      })
    );
    res.end();
  }
};

// add a new project and new company
exports.addCompany = function (req, res) {
  if (req.session.authenticated) {
    var company = req.body;

    company.projects[0].id = new ObjectId();

    console.log(JSON.stringify(company));

    _db.collection("projects", function (err, collection) {
      collection.insert(company, { safe: true }, function (err, result) {
        if (err) {
          res.send({ Error: "an error has occurred" });
        } else {
          collection.find().toArray(function (error, projects) {
            res.write(JSON.stringify(projects));
            res.end();
          });
        }
      });
    });
  } else {
    res.write(
      JSON.stringify({
        message: "You are not authorised to view this page",
      })
    );
    res.end();
  }
};

// update project
exports.updateProject = function (req, res) {
  if (req.session.authenticated) {
    var project = req.body;

    // if there's more than one project update the array don't delete company wrapper....
    _db.collection("projects", function (err, collection) {
      if (err) {
        res.send({ Error: "an error has occurred" });
      } else {
        // update the company name
        collection.update(
          { _id: new ObjectId(project.companyId) },
          { $set: { company: project.company } }
        );

        // update the nested array of porjects
        collection.update(
          {
            _id: new ObjectId(project.companyId),
            "projects.id": new ObjectId(project.projectId),
          },
          {
            $set: {
              "projects.$": {
                id: new ObjectId(project.projectId),
                project: project.name,
                link: project.link,
                skills: project.skills,
                description: project.description,
              },
            },
          },
          function () {
            collection.find().toArray(function (error, projects) {
              console.log("UPDATE PROJECTS ARRAY: ", JSON.stringify(projects));
              res.write(JSON.stringify(projects));
              res.end();
            });
          }
        );
      }
    });
  } else {
    res.write(
      JSON.stringify({
        message: "You are not authorised to view this page",
      })
    );
    res.end();
  }
};

// delete project
exports.deleteProject = function (req, res) {
  if (req.session.authenticated) {
    var postData = req.body,
      companyId = postData.companyId,
      projectId = postData.projectId,
      projectListItemsLength = postData.projectListItemsLength;

    // if there's more than one project update the array don't delete company wrapper....
    _db.collection("projects", function (err, collection) {
      if (err) {
        res.send({ error: "An error has occurred - " + err });
      } else {
        if (projectListItemsLength > 1) {
          // delete project not the company as there is more than one project listed
          collection.update(
            { _id: new ObjectId(companyId) },
            { $pull: { projects: { id: new ObjectId(projectId) } } },
            function (err, result) {
              console.log("UPDATE PROJECTS ARRAY: ", JSON.stringify(result));
              collection.find().toArray(function (error, projects) {
                res.write(JSON.stringify(projects));
                res.end();
              });
            }
          );
        } else {
          // delete company and project
          collection.remove(
            { _id: new ObjectId(companyId) },
            { safe: true },
            function (err, result) {
              console.log("DELETE COMPANY: ", JSON.stringify(result));
              collection.find().toArray(function (error, projects) {
                res.write(JSON.stringify(projects));
                res.end();
              });
            }
          );
        }
      }
    });
  } else {
    res.write(
      JSON.stringify({
        message: "You are not authorised to view this page",
      })
    );
    res.end();
  }
};

// delete user
exports.deleteUser = function (req, res) {
  if (req.session.authenticated) {
    var id = req.params.id;

    _db.collection("users", function (err, collection) {
      collection.remove({ _id: new ObjectId(id) }, { safe: true }, function (
        err,
        result
      ) {
        console.log("DELETE USER: ", JSON.stringify(result));
        collection.find().toArray(function (error, users) {
          res.write(JSON.stringify(users));
          res.end();
        });
      });
    });
  } else {
    res.write(
      JSON.stringify({
        message: "You are not authorised to use this service",
      })
    );
    res.end();
  }
};

// add user
exports.addUser = function (req, res) {
  // http://localhost:3000/adduser/joe/joeburton@gmail.com/username/password

  // create database
  // db.users.insert([{
  //     name: 'joe',
  //     email: 'joeburton@gmail.com',
  //     username: '',
  //     password: ''
  // }]);

  if (req.session.authenticated) {
    var name = req.params.name;
    var email = req.params.email;
    var username = req.params.username;
    var password = req.params.password;

    var users = [
      {
        name: name,
        email: email,
        username: username,
        password: password,
      },
    ];

    _db.collection("users", function (err, collection) {
      collection.insert(users, { safe: true }, function (err, result) {
        res.send(result);
        console.log("ADD USER...");
      });
    });
  } else {
    res.write(
      JSON.stringify({
        message: "You are not authorised.",
      })
    );
  }
};

// populate database
exports.populateDatabase = function (req, res) {
  var projects = [
    {
      company: "CashFlows",
      projects: [
        {
          id: new ObjectId(),
          project: "Payr Reloaded, (Visa prepaid wallet)",
          link: "https://www.payrcard.com/payr",
          skills: "React, Redux, JavaScript, Jest, Enzyme & SASS",
          description:
            "Whilst at CashFlows I worked on a product called Payr Reloaded, a Visa prepaid wallet. We built the front-end in React/ JavaScript, SASS and Webpack. When I started with CashFlows some early development had already taken place on the project, but the site wasn’t responsive and only worked in Chrome. I took the site from here to a fully responsive SPA (Single Page Application). I introduced a test framework using Jest and Enzyme, added linting for the SASS and JavaScript, refactored and optimised the code and introduced new features. We worked in an agile manner managing our stories and tasks through Jira. Our Sprints worked in three-week cycles with sizing sessions, breakdown sessions and retrospectives.",
        },
      ],
    },
    {
      company: "BoilerJuice",
      projects: [
        {
          id: new ObjectId(),
          project: "Mobile First Site Rebuild, (Online Heating Oil Supplier)",
          link: "www.boilerjuice.com",
          skills: "JavaScript/ jQuery, Gulp, Browserify, Jasmine, Karma & SASS",
          description:
            "For this project I was tasked with re-building the front-end of the existing website. In places replicating the existing look and feel and in others introducing a new style and set of HTML templates. We completely re-wrote the JavaScript untangling many years of un-documented business logic and functionality.",
        },
      ],
    },
    {
      company: "Cambridge Assessment",
      projects: [
        {
          id: new ObjectId(),
          project: "Results Enquiries, (SPA exam result enquiries)",
          link: "forms.admissionstestingservice.org/form/tmua-candidate",
          skills: "JavaScript, CSS, Web Components",
          description:
            "This project utilises a schema driven UI concept pioneered by Cambridge Assessment. The main Web Component used is called ca-form which consumes a JSON formatted schema that in-turn builds the responsive HTML form. The initial Web Components were developed in ES5, we later refactored and ported the components to ES6. You can view this Open Source project here. https://github.com/cambridgeweblab/common-ui",
        },
      ],
    },
    {
      company: "Tribal Worldwide",
      projects: [
        {
          id: new ObjectId(),
          project: "Perfect Volkswagen, (Customise and build your perfect VW)",
          link: "https://perfect.volkswagen.co.uk",
          skills: "Backbone, Require, Jasmine, jQuery, HTML5, CSS3/SASS & Gulp",
          description:
            "My Perfect Volkswagen is a SPA built in Backbone using Require to manage modules, SASS for the CSS and Gulp to manage the client-side files. I was responsible for adding new features and introducing unit testing using Jasmine.",
        },
        {
          id: new ObjectId(),
          project: "Avios Group, (Marketing site)",
          link: "https://aviosgroup.com/",
          skills: "Node, Express, Handlebars, CSS3, JavaScript/ jQuery, Gulp",
          description:
            "Avios Group is a Mobile First Responsive website I worked on whilst at Tribal Worldwide. It's built using Node, Express, Handlebars, CSS3 and Gulp to manage the client-side files.",
        },
      ],
    },
    {
      company: "Millimetre Media",
      projects: [
        {
          id: new ObjectId(),
          project: "Helix Property, (Portfolio and company bio)",
          link: "http://www.helixproperty.co.uk/",
          skills: "JavaScript, Browserify, CSS, PHP, Gulp",
          description:
            "I was the sole Front-end Developer on this project. I used a Mobile First Responsive approach, using HTML5, CSS3 JavaScript/ jQuery and Browserify to manage my modules with Gulp to manage the front-end workflow.",
        },
      ],
    },
    {
      company: "m.lastminute.com",
      projects: [
        {
          id: new ObjectId(),
          project: "m.lastminute.com, (Response mobile focused travel site)",
          link: "http://m.lastminute.com",
          skills: "Backbone, JavaScript, Jasmine, Require, Grunt",
          description:
            "Whilst working for lastminute.com I worked on two specific projects. For the first project I created an HTML5, LESS/ CSS3 & JavaScript mobile-first responsive search form component that used the Bootstrap framework for the underlying grid and basic styling.",
        },
        {
          id: new ObjectId(),
          project:
            "Responsive Search Forms, (Component based site search forms)",
          link: "http://www.lastminute.com",
          skills: "JavaScript, HTML, CSS, Require, Grunt",
          description:
            "Whilst working for lastminute.com I worked on two specific projects. For the first project I created an HTML5, LESS/ CSS3 & JavaScript mobile-first responsive search form component that used the Bootstrap framework for the underlying grid and basic styling.",
        },
      ],
    },
    {
      company: "Bauer Media",
      projects: [
        {
          id: new ObjectId(),
          project: "Closer Magazine, (Mobile First online magazine)",
          link: "http://www.closeronline.co.uk",
          skills: "JavaScript, Backbone, Jasmine, Require",
          description:
            "I was employed by Bauer Media to work across two teams, the UI Team and the Back end CMS Team. In the UI team I contributed towards the development of the responsive front-end build of the new Closer Magazine online edition creating responsive HTML/CSS page templates.",
        },
      ],
    },
    {
      company: "Rank Interactive",
      projects: [
        {
          id: new ObjectId(),
          project: "Blue Star, (Sports book)",
          link: "http://joe-burton.com/bluestar/",
          skills: "Backbone, JavaScript, Jasmine, Require",
          description:
            "I was responsible for managing a team of Front-end Developers in the responsive rebuild of bluesq.com. This involved creating an HTML5, LESS/ CSS and JavaScript framework that worked across mobile, tablet and desktop. I was also responsible on a day-to-day basis for managing the production of HTML prototypes to demonstrate different ideas from the UX Team.",
        },
      ],
    },
    {
      company: "Engine",
      projects: [
        {
          id: new ObjectId(),
          project: "Fabulous Magazine, (The Sun's online gossib rag)",
          link: "http://fabulousmag.co.uk",
          skills: "HTML5, CSS3, JavaScript/jQuery",
          description:
            "I worked for Jam @ The Engine Group in Soho as a Mobile Front-end Developer building HTML5, CSS3, JavaScript/jQuery smart-phone and desktop websites. This contract was a great opportunity to develop my Mobile development skills working on the mobile version of the fabulous magazine http://fabulousmag.co.uk and several small Sky mobile promotional sites.",
        },
      ],
    },
    {
      company: "SapientNitro",
      projects: [
        {
          id: new ObjectId(),
          project: "John Lewis, (Full site rebuild)",
          link: "http://www.johnlewis.com",
          skills: "HTML5, CSS3, JavaScript/jQuery",
          description:
            "Whilst working for Sapient on this contract I was based client side at John Lewis, working in a team of Front-end Developers in an Agile Software Development Environment. I was responsible for creating well structured JavaScript/jQuery functionality and clean HTML/CSS template components keeping all code as re-usable and standards compliant as possible. We introduced HTML5 and CSS3 to the project using a progressive enhancement approach so as not to limit the site to just the latest browsers.",
        },
      ],
    },
  ];

  _db.collection("projects", function (err, collection) {
    collection.insert(projects, { ordered: true }, function (err, result) {
      res.send(result);
      console.log("ADD DATA...");
    });
  });
};
