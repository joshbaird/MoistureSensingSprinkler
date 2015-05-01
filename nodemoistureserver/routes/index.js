var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NBSS' });
});

/* GET configuration page. */
router.get('/config', function(req, res, next) {
  res.render('config', { title: 'Configuration' });
});

module.exports = router;
