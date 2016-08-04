var express = require('express');
var router = express.Router();
var email = require('nodemailer');
var config = require('../app.config');
var repository = require(config.path.repository.r5e);
var Message = repository.Message;
var MessageReport = repository.MessageReport;
var Contact = repository.Contact;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('message/index', { title: 'Entre em contato conosco' });
});

router.post('/', function(req, res, next) {
    Message.create(req.body, function(err, message){
        if(!err){
            MessageReport.find({}, function(err, report){
                if(!err){
                    var recipient = "";
                    for(i = 0; i < report.length; i++)
                        recipient += report[i].name + " <" + report[i].email + ">,";
                    
                    /// create reusable transporter object using the default SMTP transport
                    var transporter = email.createTransport({
                        host: 'email-smtp.us-west-2.amazonaws.com',
                        port: 465,
                        secure: true, // use SSL
                        //service: "Gmail",
                        auth: {
                            user: 'AKIAIUEHU5RO5736EYEA',
                            pass: 'AtIElKhYh3cZ7ZvX0ITe50E2OHw0QyWVlEOFNRM8s+35'
                        }});

                    var subject = "";
                    switch(message.type)
                    {
                        case "Reservation":
                            subject += "Reserva ";
                            break;
                        case "Doubt":
                            subject += "Dúvida ";
                            break;
                        case "Suggestion":
                            subject += "Sugestão ";
                            break;
                        case "Complaint":
                            subject += "Reclamação ";
                            break;
                        case "Other":
                            subject += "Mensagem ";
                            break;
                    }

                    // setup e-mail data with unicode symbols
                    var mailOptions = {
                        from: '"Rancho 5 Estrelas" <r5e.igarape@gmail.com>', // sender address
                        to: recipient, // list of receivers
                        subject: subject + ' de ' + message.name + ' enviada pelo site', // Subject line
                        //text: message.message
                        html: '<b>Nome: </b>' + message.name + '<br/><b>Email: </b>' + message.email + '<br/><b>Tipo: </b>' + subject + '<br/><b>Mensagem: </b>' + message.message + '<br/>'
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){ console.log(error); }
                        console.log('Message sent: ' + info.response);
                    });
                }
            });
        }

        var result = { error: err, result: message };
        if(req.accepts(['html', 'json']) === 'json'){
            res.json(result);
        }else{
            res.render('message/post_result', result);
        }
    });
});

module.exports = router;