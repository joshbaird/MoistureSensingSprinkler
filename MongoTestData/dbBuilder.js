var mongo = require('mongoskin');
var port  = '';
var host  = 'localhost';
var fs    = require('fs');

var db =  mongo.db("mongodb://localhost:27017/testData", {nativ_parser:true});
db.bind('testData');



// Returns an array of json objects
function generateMoistureHistory(num, low, high){
  var oldDate = new Date(2015, 4, 15, 10, 0, 0, 0);
  var data = [];
  for(var i = 0; i < num; i++){
    var moistureRecord = {
      "dateTime" : new Date(oldDate.getMinutes() + i).toString();
    };
  }
}
function generateLightHistory(num, low, high){
  var data = [];
}
function generateTempHistory(num, low, high){
  var data = [];
}
/*
  Generates alphabetical characters for a 'unique' id string. To add characters
  to the mix of allowed chars, concat or remove characters from the 'eligibleChars'
  variable.
*/
function generateIdChar(){
  //var elegibleChars = "abcdefghijklmnopqrstubwxyz";
  var elegibleChars = "abcd";
  var range = elegibleChars.length;
  var num = Math.floor(Math.random() * range);
  return elegibleChars.charAt(num);
}
function getId(length){
  var id = "";
  for(var i = 0; i < length; i++){
    id = id + generateIdChar();
  }
  return id;
}
// Less chars
function generateSensorTypeChar(){
  var elegibleChars = "abcd";
  var range = elegibleChars.length;
  var num = Math.floor(Math.random() * range);
  return elegibleChars.charAt(num);
}

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
