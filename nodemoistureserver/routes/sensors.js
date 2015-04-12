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

/*
 * POST to addsensor
 */
router.post('/addsensor', function(req,res) {
    var db = req.db;
    db.collection('sensorlist').insert(req.body, function(err, result) {
        res.send(
            (err === null) ? { msg: ''} : {msg: err }
        );
    });
});

/*
 * DELETE sensor
 */
router.delete('/deletesensor/:id', function(req, res) {
    var db = req.db;
    var sensorToDelete = req.params.id;
    db.collection('sensorlist').removeById(sensorToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;
