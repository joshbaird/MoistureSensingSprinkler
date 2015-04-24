/*
  This script contains some utilities to create some mock data in the mongo
  database.

  Change the relavent information for the database and the data you would like
  stick in for the history
*/
var mongo = require('mongoskin');
var port  = '';
var host  = 'localhost';
var fs    = require('fs');

var tmpRecord = {}; // JSON object to fill fields and insert into the collection later
// Set database location here. (this expects mongoskin)
var db =  mongo.db("mongodb://localhost:27017/testData", {nativ_parser:true});
db.bind('testData');  // Bind to the database

/*
  This bit is an example to enter in a fake sensor with history for it sensors.
*/
tmpRecord.sensorId = getId(5); // Create a random id of 5 characters
tmpRecord.sensorType = getSensorType(3);  // Creates a random string for the type of sensor
tmpRecord.pinId = getRandomNumberString(0, 30);  // I think this is the pin for the relay
tmpRecord.turnOnMoisture = getRandomNumberString(0, 255); // Random value for the threshold 
tmpRecord.turnOffMoisture = getRandomNumberString(0, 255);// Random value for the threshold 
tmpRecord.moistureHistory = generateSensorHistory(10,   // 100 Data points
                                                  30,   // On 30 second intervals
                                                  0,    // Low range (8-bit)
                                                  255); // High Range (8-bit)
tmpRecord.turnOnLight = getRandomNumberString(0, 255); // Random value for the threshold 
tmpRecord.tunOffLight = getRandomNumberString(0, 255); // Random value for the threshold 
tmpRecord.lightHistory = generateSensorHistory(10, 30, 0, 255); // Random values for fake sensor history
tmpRecord.turnOnTemp  = getRandomNumberString(0, 255);  // Random value for the threshold 
tmpRecord.turnOffTemp = getRandomNumberString(0, 255);  // Random value for the threshold 
tmpRecord.tempHistory = generateSensorHistory(10, 30, 0, 255); // Random values for fake sensor history
tmpRecord.turnOnTime  = new Date(2015, 4, 15, 11, 0, 0, 0).getTime().toString(); // Write out epoch time in ms
tmpRecord.turnOffTime = new Date(2015, 4, 15, 23, 0, 0, 0).getTime().toString(); // Write out epoch time in ms

// Insert the fake record into the database
db.testData.insert(tmpRecord, function(err, result){
  if(err) throw err;
  if(result){
    console.log("Success");
    //console.log(result);
  }
  db.close(); // CLose the connection
});

// End exammple

////////////////////////////////////////////////////////////////////////////////
// Utility Functions
////////////////////////////////////////////////////////////////////////////////
/*
  num     : the number of records to create
  offset  : the time in seconds between generated History points
  low     : the low end of the generated values (expecting some number value)
  high    : the high end of the genreated values (expecting some number value)
*/
function generateSensorHistory(num, offset, low, high){
  var oldDate = new Date(2015, 4, 15, 10, 0, 0, 0); // Create an arbitrary date
  var baseMs = oldDate.getTime(); // The unit is ms
  var data = [];
  for(var i = 0; i < num; i++){
    var sensorData = {
      "dateTime" : baseMs + (i * offset * 1000),  // Offset the base time
      "value"    : getRandomNumberString(low, high)
    };
    data.push(sensorData);
  }
  return data;
}
/*
  Generates alphabetical characters for a 'unique' id string. To add characters
  to the mix of allowed chars, concat or remove characters from the 'eligibleChars'
  variable.
*/
function generateIdChar(){
  var eligibleChars = "abcdefghijklmnopqrstubwxyz";
  //var eligibleChars = "abcd";
  var range = eligibleChars.length;
  var num = Math.floor(Math.random() * range);
  return eligibleChars.charAt(num);
}
function getId(length){
  var id = "";
  for(var i = 0; i < length; i++){
    id = id + generateIdChar();
  }
  return id;
}

/*
  Return randomized chars of only a few eligible characters. Hopefully this
  could produce some overlap to to represent a real field. Its possible to have
  many sensors of the same type.
*/
function generateSensorTypeChar(){
  //var eligibleChars = "abcd";
  var eligibleChars = "abc";
  var range = eligibleChars.length;
  var num = Math.floor(Math.random() * range);
  return eligibleChars.charAt(num);
}

/*
  Returns a randomized string of an arbitrary length.
  See function generateSensorTypeChar()
*/
function getSensorType(length){
  var id = "";
  for(var i = 0; i < length; i++){
    id = id + generateSensorTypeChar();
  }
  return id;
}

/*
  Returns a random integer in the range specified
*/
function getRandomNumber(low, high){
  return Math.floor(Math.random() * high) + low;

}

/*
  Returns the random number as a string. Same as getRandomNumber, now with strings!
*/
function getRandomNumberString(low, high){
  var number = getRandomNumber(low, high);
  return number.toString();
}

/*
  Prints out some stuff to visually inspect
*/
function randomTester(){
  var randomNumbers = [];
  for(var i =0; i < 10E6; i++ ){
    var num = generateIdChar();
    if(randomNumbers[num] == undefined){
      randomNumbers[num] = 1;
    }
    else{
      randomNumbers[num] = randomNumbers[num] + 1; // Increment it
    }
  }
  for(var i = 0; i < randomNumbers.length; i++){
    console.log(String.fromCharCode(97 + i) + " : " + randomNumbers[i]);
  }
}
