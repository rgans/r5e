var mongoose = require('mongoose');
var validator = require('mongoose-validators');
var schema = mongoose.Schema;

var messageSchema = new schema({
    name: {type: String, required: true, minlength: 5, maxlength: 100},
    email: {type: String, required: true, minlength: 5, maxlength: 100, validate: validator.isEmail()},
    type: {type: String, required: true, enum:['Reservation', 'Doubt', 'Suggestion', 'Complaint', 'Other']},
    message: {type: String, required: true, minlength: 10, maxlength: 400},
    created: {type: Date, default: Date.now}
});

var entity = { collection_name: 'message' };

entity.model = mongoose.model(entity.collection_name, messageSchema);

module.exports = entity;