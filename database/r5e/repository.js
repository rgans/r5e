var config = require('../../app.config');
var mongoose = require("mongoose");

// Create the database connection 
mongoose.connect(config.repository.r5e.cnnString, config.repository.r5e.options);

// CONNECTION EVENTS 
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + config.repository.r5e.cnnString);
});

mongoose.connection.on('error', function (err) {
    console.error.bind(console, 'MongoDB connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

var contactSchema = require(config.path.entity.r5e.contact);
var messageSchema = require(config.path.entity.r5e.message);
var messageReportSchema = require(config.path.entity.r5e.message_report);
var userSchema = require(config.path.entity.r5e.user);

module.exports = {
    Contact: mongoose.model(contactSchema.collection_name),
    Message: mongoose.model(messageSchema.collection_name),
    MessageReport: mongoose.model(messageReportSchema.collection_name),
    User: mongoose.model(userSchema.collection_name),
};