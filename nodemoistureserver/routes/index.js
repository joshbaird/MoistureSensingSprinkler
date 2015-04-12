var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sensorlist', function(req, res) {
  var db = req.db;
  var collection =  db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('sensorlist', {
      "sensorlist" : docs
    });
  });
});

router.get('/newsensor', function(req, res){
  res.render('newsensor', {title: 'Add New Sensor' });
});

// POST
router.post('/addsensor', function(req, res) {
  var db = req.db;

  var address = req.body.address;
  var turnOn = req.body.turnOn;
  var turnOff = req.body.turnOff;

  var collection = db.get('usercollection');
  
  collection.insert({
    "address" : address,
    "turnOn" : turnOn,
    "turnOff" : turnOff
  }, function(err, doc) {
      if(err) {
        res.send("There was an issue with adding a sensor to the database...");
      }
      else {
        res.location("sensorlist");
        res.redirect("sensorlist");
      }
   });
}); 

module.exports = router;
