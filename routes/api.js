
// Mongo objects
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

// API
var production = false;

var url;
var dbObj;
var sess;

// Connection URL 
if (production) {
    // production
    url = 'mongodb://projects:UGRJRzNidzVFK2JZbWdRYjdzZGpETFdCUURDeXRkeHYwUlRJUkNsdHJNcz0K@172.17.0.15:27017/projectsdb-production';
} else {
    // local dev
    url = 'mongodb://localhost:32768/projectDirectory';
}


// Use connect method to connect to the Server 
MongoClient.connect(url, function (err, db) {
    console.log('Connected correctly to server: http://localhost:3000');
    dbObj = db;
});


// login
exports.auth = function (req, res) {

    sess = req.session;

    sess.username = req.body.username;
    sess.password = req.body.password;

    if (sess.username === 'projects' && sess.password === 'admin') {
        console.log('Login Successful');
        sess.authenticated = true;
        res.redirect('/projects');
    } else {
        console.log('Login Failed');
        res.redirect('/login');
    }

};


// logout
exports.logout = function (req, res) {

    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Successful logout');
            res.redirect('/');
        }
    });

};


// get all projects in the collection
exports.findAll = function (req, res) {

    var collection = dbObj.collection('projects'),
        authenticated = (req.session.authenticated) ? true : false;

    collection.find().toArray(function (err, projects) {
        res.write(JSON.stringify({
            projects: projects,
            authorised: authenticated
        }));
        res.end();
    });

};


// get projects by id
exports.findById = function (req, res) {

    var id = req.params.id;

    console.log('Retrieving project: ' + id);

    dbObj.collection('projects', function (err, collection) {
        collection.findOne({ '_id': new ObjectId(id) }, function (err, item) {
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

        dbObj.collection('projects', function (err, collection) {

            collection.update({ '_id': new ObjectId(company.id) }, { $push: { projects: project } }, { safe: true }, function (err, result) {
                if (err) {
                    console.log('Error updating project: ' + err);
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    collection.find().toArray(function (error, projects) {
                        res.write(JSON.stringify(projects));
                        res.end();
                    });
                }
            });

        });

    } else {
        res.write(JSON.stringify({
            'message': 'You are not authorised to view this page'
        }));
        res.end();
    }

}


// add a new project and new company
exports.addCompany = function (req, res) {

    if (req.session.authenticated) {

        var company = req.body;

        company.projects[0].id = new ObjectId();

        console.log(JSON.stringify(company));

        dbObj.collection('projects', function (err, collection) {
            collection.insert(company, { safe: true }, function (err, result) {
                if (err) {
                    res.send({ 'Error': 'an error has occurred' });
                } else {
                    collection.find().toArray(function (error, projects) {
                        res.write(JSON.stringify(projects));
                        res.end();
                    });
                }
            });
        });

    } else {
        res.write(JSON.stringify({
            'message': 'You are not authorised to view this page'
        }));
        res.end();
    }


}


// update project
exports.updateProject = function (req, res) {

    if (req.session.authenticated) {

        var project = req.body;

        // if there's more than one project update the array don't devare company wrapper....
        dbObj.collection('projects', function (err, collection) {

            if (err) {

                res.send({ 'Error': 'an error has occurred' });

            } else {

                collection.update(
                    { _id: new ObjectId(project.companyId) },
                    { $set: { company: project.company } }
                );

                collection.update(
                    { '_id': new ObjectId(project.companyId), 'projects.id': new ObjectId(project.projectId) },
                    {
                        '$set': {
                            'projects.$': {
                                id: new ObjectId(project.projectId),
                                project: project.name,
                                link: project.link,
                                skills: project.skills,
                                description: project.description
                            }
                        }
                    }, function () {
                        collection.find().toArray(function (error, projects) {
                            console.log('UPDATE PROJECTS ARRAY: ', JSON.stringify(projects));
                            res.write(JSON.stringify(projects));
                            res.end();
                        });
                    }
                );

            }

        });

    } else {
        res.write(JSON.stringify({
            'message': 'You are not authorised to view this page'
        }));
        res.end();
    }

}


// devare project
exports.devareProject = function (req, res) {

    if (req.session.authenticated) {

        var postData = req.body,
            companyId = postData.companyId,
            projectId = postData.projectId,
            projectListItemsLength = postData.projectListItemsLength;

        // if there's more than one project update the array don't devare company wrapper....
        dbObj.collection('projects', function (err, collection) {

            if (err) {

                res.send({ 'error': 'An error has occurred - ' + err });

            } else {

                if (projectListItemsLength > 1) {

                    collection.update(
                        { _id: new ObjectId(companyId) },
                        { $pull: { 'projects': { 'id': new ObjectId(projectId) } } }, function (err, result) {
                            console.log('UPDATE PROJECTS ARRAY: ', JSON.stringify(result));
                            collection.find().toArray(function (error, projects) {
                                res.write(JSON.stringify(projects));
                                res.end();
                            });
                        });

                } else {

                    collection.remove({ '_id': new ObjectId(companyId) }, { safe: true }, function (err, result) {
                        console.log('DEvarE COMPANY: ', JSON.stringify(result));
                        collection.find().toArray(function (error, projects) {
                            res.write(JSON.stringify(projects));
                            res.end();
                        });
                    });

                }

            }

        });

    } else {
        res.write(JSON.stringify({
            'message': 'You are not authorised to view this page'
        }));
        res.end();
    }

}


// populate database
exports.populateDatabase = function (req, res) {

    var projects = [{
        company: 'Tribal Worldwide',
        projects: [
            {
                id: new ObjectId(),
                project: 'Perfect Volkswagen',
                link: 'https://perfect.volkswagen.co.uk',
                skills: 'Backbone, Require, Jasmine, jQuery, HTML5, CSS3/SASS & Gulp',
                description: 'My Perfect Volkswagen is a SPA built in Backbone using Require to manage modules, SASS for the CSS and Gulp to manage the client-side files. I was responsible for adding new features and introducing unit testing using Jasmine.'
            },
            {
                id: new ObjectId(),
                project: 'Avios Group',
                link: 'https://aviosgroup.com/',
                skills: 'Node, Express, Handlebars, CSS3, JavaScript/ jQuery, Gulp',
                description: 'Avios Group is a Mobile First Responsive website I worked on whilst at Tribal Worldwide. It\'s built using Node, Express, Handlebars, CSS3 and Gulp to manage the client-side files.'
            }]
    },
        {
            company: 'Millimetre Media',
            projects: [
                {
                    id: new ObjectId(),
                    project: 'Helix Property',
                    link: 'http://www.helixproperty.co.uk/',
                    skills: 'JavaScript, Browserify, CSS, PHP, Gulp',
                    description: 'I was the sole Front-end Developer on this project. I used a Mobile First Responsive approach, using HTML5, CSS3 JavaScript/ jQuery and Browserify to manage my modules with Gulp to manage the front-end workflow.'
                }
            ]
        },
        {
            company: 'm.lastminute.com',
            projects: [{
                id: new ObjectId(),
                project: 'm.lastminute.com',
                link: 'http://m.lastminute.com',
                skills: 'Backbone, JavaScript, Jasmine, Require, Grunt',
                description: 'Whilst working for lastminute.com I worked on two specific projects. For the first project I created an HTML5, LESS/ CSS3 & JavaScript mobile-first responsive search form component that used the Bootstrap framework for the underlying grid and basic styling.'
            }, {
                    id: new ObjectId(),
                    project: 'Responsive Search Forms',
                    link: 'http://www.lastminute.com',
                    skills: 'JavaScript, HTML, CSS, Require, Grunt',
                    description: 'Whilst working for lastminute.com I worked on two specific projects. For the first project I created an HTML5, LESS/ CSS3 & JavaScript mobile-first responsive search form component that used the Bootstrap framework for the underlying grid and basic styling.'
                }]
        },
        {
            company: 'Bauer Media',
            projects: [{
                id: new ObjectId(),
                project: 'Closer Magazine',
                link: 'http://www.closeronline.co.uk',
                skills: 'JavaScript, Backbone, Jasmine, Require',
                description: ' I was employed by Bauer Media to work across two teams, the UI Team and the Back end CMS Team. In the UI team I contributed towards the development of the responsive front-end build of the new Closer Magazine online edition creating responsive HTML/CSS page templates and writing any JavaScript functionality where necessary'
            }]
        }, {
            company: 'Rank Interactive',
            projects: [{
                id: new ObjectId(),
                project: 'Blue Star',
                link: 'http://joe-burton.com/bluestar/',
                skills: 'Backbone, JavaScript, Jasmine, Require',
                description: 'I was responsible for managing a team of Front-end Developers in the responsive rebuild of bluesq.com. This involved creating an HTML5, LESS/ CSS and JavaScript framework that worked across mobile, tabvar and desktop. I was also responsible on a day-to-day basis for managing the production of HTML prototypes to demonstrate different ideas from the UX Team.'
            }]
        }, {
            company: 'Engine',
            projects: [{
                id: new ObjectId(),
                project: 'Fabulous Magazine',
                link: 'http://www.thesun.co.uk/sol/homepage/fabulous',
                skills: 'HTML5, CSS3, JavaScript/jQuery',
                description: 'I worked for Jam @ The Engine Group in Soho as a Mobile Front-end Developer building HTML5, CSS3, JavaScript/jQuery smart-phone and desktop websites. This contract was a great opportunity to develop my Mobile development skills working on the mobile version of the fabulous magazine http://fabulousmag.co.uk and several small Sky mobile promotional sites.'
            }]
        }, {
            company: 'SapientNitro',
            projects: [{
                id: new ObjectId(),
                project: 'John Lewis',
                link: 'http://www.johnlewis.com',
                skills: 'HTML5, CSS3, JavaScript/jQuery',
                description: 'Whilst working for Sapient on this contract I was based client side at John Lewis, working in a team of Front-end Developers in an Agile Software Development Environment. I was responsible for creating well structured JavaScript/jQuery functionality and clean HTML/CSS template components keeping all code as re-usable and standards compliant as possible. We introduced HTML5 and CSS3 to the project using a progressive enhancement approach so as not to limit the site to just the latest browsers.'
            }]
        }];

    dbObj.collection('projects', function (err, collection) {
        collection.insert(projects, { safe: true }, function (err, result) {
            res.send(result);
            console.log('ADD DATA...');
        });
    });

}