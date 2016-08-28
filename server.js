   // Set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');                         // log requests to the console (express4)
    var bodyParser = require('body-parser');                // pull information from HTML POST (express4)
    var methodOverride = require('method-override');        // simulate DELETE and PUT (express4)

    var connection = require('./app/config/database');
    
    //Configuration =================

    mongoose.connect(connection.connectionString);                 // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(express.static(__dirname + '/views'));  
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());


	// Model: Goal =================
    var Goal = mongoose.model('Goal', {
        text : String
    });

	// var Goal = require('./app/models/Goal');


	// routes ======================================================================
    
            // get all goals
            app.get('/api/goals', function(req, res) {
                
                // use mongoose to get all goals in the database
                Goal.find(function(err, goals) {

                    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                    if (err)
                        res.send(err)

                    res.json(goals); // return all goals in JSON format
                });
            });

            // create todo and send back all goals after creation
            app.post('/api/goals', function(req, res) {

                // create a todo, information comes from AJAX request from Angular
                Goal.create({
                    text : req.body.text,
                    done : false
                }, function(err, goal) {
                    if (err)
                        res.send(err);

                    // get and return all the goals after you create another
                    Goal.find(function(err, goals) {
                        if (err)
                            res.send(err)
                        res.json(goals);
                    });
                });

            });

            // delete a todo
            app.delete('/api/goals/:goal_id', function(req, res) {
                Goal.remove({
                    _id : req.params.goal_id
                }, function(err, goal) {
                    if (err)
                        res.send(err);

                    // get and return all the goals after you create another
                    Goal.find(function(err, goals) {
                        if (err)
                            res.send(err)
                        res.json(goals);
                    });
                });
            });


            // front-end : Angular Entry point
            app.get('*', function(req, res) {
                res.sendfile('views/login.html'); // load the entry point for angular
            });
	
	





    // listen 
    app.listen(8080);
    console.log("App listening on port 8080");