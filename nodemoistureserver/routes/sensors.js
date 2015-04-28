var express = require('express');
var router = express.Router();


////////////////////////////////// sensorlist /////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////// sensorconfig /////////////////////////////////////
/*
 * GET sensorconfig
 */
router.get('/sensorconfig', function(req,res) {
  var db = req.db;
  db.collection('sensorconfig').find().toArray(function (err, items) {
    res.json(items);
  });
});

/*
 * POST to addsensorconfig
 */
router.post('/addsensorconfig', function(req,res) {
    console.log("addsensorconfig called with type: " + req.body["sensorType"]);
    var db = req.db;
    db.collection('sensorconfig').find().toArray( function (err, items) {
      var result = 0;
      for (i = 0; i < items.length ; i++){
        if(items[i]["sensorType"] === req.body["sensorType"]){
          result = 1;
          break;
        }
      }
      console.log(result);
      if(result === 1){
        console.log("sensorType already exists, updating info");
        db.collection('sensorconfig').update({"sensorType" : req.body["sensorType"]}, req.body, function(err, result) {
          res.send(
            (err === null) ? { msg: ''} : {msg: err }
          );
        });
      }
      else{
        console.log("new sensorId, adding new sensor config");
        db.collection('sensorconfig').insert(req.body, function(err, result) {
          res.send(
            (err === null) ? { msg: ''} : {msg: err }
          );
        });
      }
    });
});

/*
 * POST to updatesensorconfig
 */
router.post('/updatesensorconfig', function(req,res) {
    var db = req.db;
    db.collection('sensorconfig').update({"sensorId" : req.body.sensorId } ,req.body, function(err, result) {
      res.send(
          (err === null) ? { msg: ''} : {msg: err }
      );
    });
});

/*
 * DELETE sensorconfig
 */
router.delete('/deletesensorconfig/:id', function(req, res) {
    var db = req.db;
    var sensorToDelete = req.params.id;
    db.collection('sensorconfig').removeById(sensorToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});
/////////////////////////////////////////////////////////////////////////////////////


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
