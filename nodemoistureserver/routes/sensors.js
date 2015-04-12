var express = require('express');
var router = express.Router();

/*
 *  GET sensorlist
 */
router.get('/sensorlist', function(req,res) {
  var db = req.db;
  db.collection('sensorlist').find().toArray(function (err, items) {
    res.json(items);
  });
});

module.exports = router;
