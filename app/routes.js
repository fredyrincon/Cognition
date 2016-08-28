    
    
    var Goal = require('./models/Goal');


	// routes ======================================================================

    
    //Closure for JS API
    module.exports = (function(app)
    {
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
	
	


    })();