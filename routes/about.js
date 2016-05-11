var express = require('express');
var router = express.Router();
var config = require('../app.config');
var repository = require(config.path.repository.r5e);
var Message = repository.Message;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('about/index', { title: 'Saiba um pouco mais sobre nós' });
});

router.get('/igarape', function(req, res, next) {
  res.render('about/igarape', { title: 'Saiba um pouco mais sobre a cidade de Igarapé' });
});

module.exports = router;
