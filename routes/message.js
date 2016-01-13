var express = require('express');
var router = express.Router();
var email   = require("emailjs/email");
var config = require('../app.config');
var repository = require(config.path.repository.r5e);
var Message = repository.Message;
var MessageReport = repository.MessageReport;

/* GET users listing. */
router.get('/', function(req, res, next) {
    var contact = repository.Contact;
    contact.find({}, function(err, result){
        
        if(err) console.log(err);
        else console.log(result);
        
        res.json(result);
    });
});

router.post('/', function(req, res, next) {
    Message.create(req.body, function(err, message){
        if(!err){
            MessageReport.find({}, function(err, report){
                if(!err){
                    console.log(report);
                }
            });
        }

        var result = { error: err, result: message };
        if(req.accepts(['html', 'json']) === 'json')
            res.json(result);
        else
            res.render('message/post_result', result);
    });
});

module.exports = router;