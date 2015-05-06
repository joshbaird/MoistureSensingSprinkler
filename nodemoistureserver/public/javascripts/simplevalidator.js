/*
  This is a simple validator that can be used
*/
function SimpleValidator(constraints, colors){
  this.ids = Object.keys(constraints);
  this.constraints = constraints;
  this.colors = colors;
  var self = this;  // So we can talk to ourselves

  this.inputChange = function(evt){
    console.log("Input change");
    // Get the input id of the input being...well...inputted
    var inputId = evt.currentTarget.id;
    var regEx   = constraints[inputId];
    setTimeout(function(){
      inputData = evt.currentTarget.value;

      //if we leave an input blank during fill in, not necessarily invalid
      //wait until 'add sensor' clicked...less anxiety
      if(inputData == ""){
        $(evt.target).css('background-color', 'white');
        return;
      }
      if (regEx.exec(inputData) == null){
        $(evt.target).css('background-color', 'IndianRed');
      }
      else{ // Data is valid for the moment
        $(evt.target).css('background-color', 'lime');
      }
    },200);
  };
  this.getInputChangeFunction = function(){return this.inputChange;};

  /*
    Loops through and
  */
  this.testInputs = function(){
    // Loop through all of the text inputs to get the ids and access their status
    for(var i = 0; i < this.ids.length; i++){
      inputId = this.ids[i];  // Get the id
      regEx = constraints[inputId]; // Get the regEX
      inputVal = $('#' + inputId);
      if(regEx.exec(inputVal) == null){
        return {
          "valid" : false,
          "input" : inputId
        };
      }
      // Check to see if there is any value
      if(inputs[i].value == ""){
        $(inputs[i]).css('background-color', 'crimson');
      }
    }
    return {
      "valid" : true,
      "input" : ""
    };
  }
}

// Functions
// Use regex literals so they don't have to made at runtime
var regExObjs = {
  'inputSensorId'       : /^[\w\d-]+$/i,  // One or more word chars, digits, or -
  'inputSensorType'     : /^[\w\d-]+$/i,
  'inputPinId'          : /^[\d]{1,2}$/,  // 1 or 2 digits
  'inputTurnOnMoisture' : /^0*[\d]{1,2}$|^0$|^100$/,
  'inputTurnOffMoisture': /^0*[\d]{1,2}$|^0$|^100$/,
  'inputTurnOnLight'    : /^0*[\d]{1,2}$|^0$|^100$/,
  'inputTurnOffLight'   : /^0*[\d]{1,2}$|^0$|^100$/,
  'inputTurnOnTemp'     : /^0*([\d]{1,2}|0|100)\s?F°$/i,
  'inputTurnOffTemp'    : /^0*([\d]{1,2}|0|100)\s?F°$/i,
  'inputDateStart'      : /^[\d]{1,2}\/[\d]{1,2}\/[\d]{4}$/,
  'inputTimeStart'      : /^[\d]{1,2}:[\d]{2}\s?(am|pm)$/i,
  'inputDateEnd'        : /^[\d]{1,2}\/[\d]{1,2}\/[\d]{4}$/,
  'inputTimeEnd'        : /^[\d]{1,2}:[\d]{2}\s?(am|pm)$/i,
};
