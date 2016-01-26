var express = require('express');
var router = express.Router();
var config = require('../app.config');
var repository = require(config.path.repository.r5e);
var User = repository.User;
var authorize = require(config.path.security.authorize);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Express' });
});

router.get('/signin', function(req, res, next) {
  res.render('admin/signin', { title: 'Express' });
});

router.post('/signin', function(req, res, next) {
    var login = {
        username: req.body.username,
        password: req.body.password
    };
    User.find({ name: login.username, password: login.password }, function(err, result){
        
        if(err) console.log(err);
        else console.log(result);
        
        res.json(result);
    });
});

module.exports = router;