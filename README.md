### Node, Express, Handlebars, MongoDB, React & Redux CRUD Apllication

```
// Create and connect to your mongoDB
// Step 1: Install MongoDB and cd in to it's directory
$ cd /usr/local/mongodb

// Step 2: start mongoDB
$ ./bin/mongod

// Step 3: start mongo shell
$ ./bin/mongo

// Step 4: select/ create database
$ use DB_NAME
```

```
// Useful mongo client commands
$ show dbs
$ use projectDirector
$ db.getCollection('projects').find()
$ db.getCollection('users').find()
```

```
// Create user account
db.users.insert([{
    name: 'james',
    email: 'jamesburton@gmail.com',
    username: 'name',
    password: '*******'
}]);
```

```
start the App
$ npm install
$ nodemon
```
