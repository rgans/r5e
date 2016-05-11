var express = require('express');
var router = express.Router();
var config = require('../app.config');
var authorize = require(config.path.security.authorize);
var UserManager = require(config.path.security.usermanager);

/* GET home page. */
router.get('/', authorize, function(req, res, next) {
  res.render('admin/index', { title: 'Admin' });
});

router.get('/signin', function(req, res, next) {
  res.render('admin/signin', { title: 'Login' });
});

router.get('/signout', function(req, res, next) {
    req.session.user = null;
    res.redirect('/admin/signin');
});

router.post('/signin', function(req, res, next) {
    UserManager.find(req.body, function(err, result){
        if(!err) {
            var identity = UserManager.createIdentity(result);
            req.session.user = identity;
            res.redirect('/admin');
        } else {
            res.render('admin/signin', err);
        }
    });
});

router.get('/signup', function(req, res, next) {
  res.render('admin/signup', { title: 'Cadastro de novo usuário' });
});

router.post('/signup', function(req, res, next) {
    UserManager.create(req.body, function(err, result){
        if(!err) {
            res.redirect('/admin/signup');
        } else {
            res.render('admin/signup', err);
        }
    });
});

module.exports = router;