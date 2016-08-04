var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;

var messageReportSchema = new schema({
    name: {type: String, required: true, minlength: 5, maxlength: 100},
    email: {type: String, required: true, minlength: 5, maxlength: 100, validate: validator.isEmail()}
});

var entity = { collection_name: 'message_report' };

entity.model = mongoose.model(entity.collection_name, messageReportSchema);

module.exports = entity;