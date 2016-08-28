

    var connection = require('./config/database');

    var mongoose = require('mongoose');

    mongoose.connect(connection.connectionString);                 // connect to mongoDB database on modulus.io


	// Model: Goal =================
    module.exports = mongoose.model('Goal', {
        text : String
    });