var express = require('express');
var router = express.Router();
var config = require('../app.config');
var repository = require(config.path.repository.r5e);
var Message = repository.Message;

/* GET home page. */
router.get('/', function(req, res, next) {
    var picture_array = [
        { path: '/img/picture/pc1.jpg', alt: '', title: 'tasdsa dsa', description: 'asd sad sadasdasd' },
        { path: '/img/picture/pc2.jpg', alt: '', title: 'ffff', description: '' },
        { path: '/img/picture/pc3.jpg', alt: '', title: 'xvxzvz', description: '' },
        { path: '/img/picture/pc4.jpg', alt: '', title: 'xvxzvz', description: '' },
        { path: '/img/picture/pc5.jpg', alt: '', title: 'xvxzvz', description: '' },
        { path: '/img/picture/pc6.jpg', alt: '', title: 'xvxzvz', description: '' },
        { path: '/img/picture/pc7.jpg', alt: '', title: 'xvxzvz', description: '' },
        { path: '/img/picture/pc8.jpg', alt: '', title: 'xvxzvz', description: '' },
        { path: '/img/picture/pc9.jpg', alt: '', title: 'xvxzvz', description: '' },
        { path: '/img/picture/pc10.jpg', alt: '', title: 'xvxzvz', description: '' },
        { path: '/img/picture/pc11.jpg', alt: '', title: 'xvxzvz', description: '' },
    ];
    
    res.render('gallery/index', { title: 'Veja fotos do rancho', picture: picture_array });
});

module.exports = router;
