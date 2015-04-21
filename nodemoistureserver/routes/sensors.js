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
    console.log("addsensor called with object id: " + req.body["sensorId"]);
    var db = req.db;
    db.collection('sensorlist').find().toArray( function (err, items) {
      var result = 0;
      for (i = 0; i < items.length ; i++){
        if(items[i]["sensorId"] === req.body["sensorId"]){
          result = 1;
          break;
        }
      }
      console.log(result);
      if(result === 1){
        console.log("sensorId already exists, updating info");
        db.collection('sensorlist').update({"sensorId" : req.body["sensorId"]}, req.body, function(err, result) {
          res.send(
            (err === null) ? { msg: ''} : {msg: err }
          );
        });
      }
      else{
        console.log("new sensorId, adding new sensor");
        db.collection('sensorlist').insert(req.body, function(err, result) {
          res.send(
            (err === null) ? { msg: ''} : {msg: err }
          );
        });
      }
    });
});

/*
 * POST to updateSensor
 */
router.post('/updatesensor', function(req,res) {
    var db = req.db;
    db.collection('sensorlist').update({"sensorId" : req.body.sensorId } ,req.body, function(err, result) {
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

/*
  Generates alphabetical characters for a 'unique' id string. To add characters
  to the mix of allowed chars, concat or remove characters from the 'eligibleChars'
  variable.
*/
function generateIdChar(){
  var elegibleChars = "abcdefghijklmnopqrstubwxyz";
  var range = elegibleChars.length;
  var num = Math.floor(Math.random() * range);
  return elegibleChars.charAt(num);
}
/*
  Generates a 'Unique' id of arbitrary length
*/
function getId(length){
  var id = "";
  for(var i = 0; i < length; i++){
    id = id + generateIdChar();
  }
  return id;
}

module.exports = router;
