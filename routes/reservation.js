var express = require('express');
var router = express.Router();
var config = require('../app.config');
var repository = require(config.path.repository.r5e);
var Message = repository.Message;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('reservation/index', { title: 'Faça já a sua reserva' });
});

module.exports = router;
