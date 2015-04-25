// SensorList Data
var sensorListData = [];
var debug=1;
// DOM ready
$(document).ready(function() {

    var datepickersOpt = {
       // dateFormat: 'dd-mm-yy',
        minDate   : 0,
        'format': 'm/d/yyyy',
        'autoclose': true
    }


    // $('#basicExample .time').timepicker({
    //     'showDuration': false,
    //     'timeFormat': 'g:ia'
    // });

    $('.date').datepicker($.extend({
        onSelect: function() {
            var minDate = $(this).datepicker('getDate');
            minDate.setDate(minDate.getDate()+2); //add two days
            $("#to_date").datepicker( "option", "minDate", minDate);
        }
    },datepickersOpt));

    //need to work on part for converting to UTF for mongodb store


    // initialize datepair
    // var basicExampleEl = document.getElementById('basicExample');
    // var datepair = new Datepair(basicExampleEl);
    

    // $('.clockpicker').clockpicker()
    //     .find('input').change(function(){
    //         // TODO: time changed
    //         console.log(this.value);
    //     });
    $('.clockPickerInput').clockpicker({
        autoclose: true,
        twelvehour: true,
        placement: 'bottom',
        
        default: 'now'
        //donetext: 'yep',

    });

    //if (something) {
    // Manual operations (after clockpicker is initialized).
    //  $('.clockPickerInput').clockpicker('show') // Or hide, remove ...
    //        .clockpicker('toggleView', 'minutes');
    //}
    

    // Populate the user table on initial page load
    populateTable();
    
    // Sensor Address link click
    $('#sensorList table tbody').on('click', 'td a.linkshowsensor', showSensorInfo);

    // Add Sensor button click
    $('#btnAddSensor').on('click', addSensor);

    // Delete Sensor
    $('#sensorList table tbody').on('click', 'td a.linkdeletesensor', deleteSensor);
});

// Functons
function populateTable() {
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/sensors/sensorlist', function( data ) {
        // Stick our sensor data array into a sensorlist variable in the global object
        sensorListData = data;
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowsensor" rel="' + this.sensorId + '">' + this.sensorId + '</a></td>';
            tableContent += '<td>' + this.sensorType + '</td>';
            tableContent += '<td>' + this.pinId + '</td>';
            tableContent += '<td><a href="#" class="linkdeletesensor" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#sensorList table tbody').html(tableContent);
    });
}; 

// Show Sensor Info
function showSensorInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve Address from link rel attribute
    var thisSensorId = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = sensorListData.map(function(arrayItem) { return arrayItem.sensorId; }).indexOf(thisSensorId);
    // Get our Sensor Object
    var thisSensorObject = sensorListData[arrayPosition];

    //Populate Info Box
    $('#sensorInfoId').text(thisSensorObject.sensorId);
    $('#sensorInfoType').text(thisSensorObject.sensorType);
    $('#sensorInfoPinId').text(thisSensorObject.pinId);

    $('#sensorInfoTurnOnTime').text(new Date(parseInt(thisSensorObject.turnOnTime)));
    $('#sensorInfoTurnOffTime').text(new Date(parseInt(thisSensorObject.turnOffTime)));
    
    $('#sensorInfoTurnOnMoisture').text(thisSensorObject.turnOnMoisture);
    $('#sensorInfoTurnOffMoisture').text(thisSensorObject.turnOffMoisture);
    if("moistureHistory" in thisSensorObject)
        $('#sensorInfoMoistureHistory').text(JSON.stringify(thisSensorObject.moistureHistory));
    else
        $('#sensorInfoMoistureHistory').text("");

    $('#sensorInfoTurnOnLight').text(thisSensorObject.turnOnLight);
    $('#sensorInfoTurnOffLight').text(thisSensorObject.turnOffLight);
    if("lightHistory" in thisSensorObject)
        $('#sensorInfoLightHistory').text(JSON.stringify(thisSensorObject.lightHistory));
    else
        $('#sensorInfoLightHistory').text("");

    $('#sensorInfoTurnOnTemp').text(thisSensorObject.turnOnTemp);
    $('#sensorInfoTurnOffTemp').text(thisSensorObject.turnOffTemp);
    if("tempHistory" in thisSensorObject)
        $('#sensorInfoTempHistory').text(JSON.stringify(thisSensorObject.tempHistory));
    else
        $('#sensorInfoTempHistory').text("");

};


// Add Sensor
function addSensor(event) {
    event.preventDefault();
    var errorCount = 0;
    $('#addSensor input').each(function(index, val) {
        if($(this).val() === '') { errorCount++;}
    });


    //To get epoch we take values of two fields '04/23/2015' and 11:45PM and form in to string:
    //'04/23/2015, 11:45PM'
    //We let date.js do the rest, aka Date.parse(string) -> datestring
    //and use the native js function Date(datestring).getTime() to give us epoch
    startEpoch = new Date(Date.parse($('#addSensor fieldset input#inputDateStart').val() + ", " + $('#addSensor fieldset input#inputTimeStart').val())).getTime();
    
    console.log("Start epoch: " + startEpoch);
    endEpoch = new Date(Date.parse($('#addSensor fieldset input#inputDateEnd').val() + ", " + $('#addSensor fieldset input#inputTimeEnd').val())).getTime();
    console.log("End epoch: " + endEpoch);

    //some basic error checking is never a bad thing...
    if( (endEpoch <= startEpoch) || (startEpoch == null) || (endEpoch == null) )
    {
        console.log("bad times...");
    }

    // check errorCount is 0
    //turn on debug at top if you don't want to fill in all fields
    if(errorCount === 0 || debug) {
        var newSensor = {
            'sensorId' : $('#addSensor fieldset input#inputSensorId').val(),
            'sensorType' : $('#addSensor fieldset input#inputSensorType').val(),
            'pinId' : $('#addSensor fieldset input#inputPinId').val(),

            // add time on and off here
            //'turnOnTime' : $('#addSensor fieldset input#inputPinId').val(),
            //'turnOffTime' : $('#addSensor fieldset input#inputPinId').val(),

            'turnOnMoisture' : $('#addSensor fieldset input#inputTurnOnMoisture').val(),
            'turnOffMoisture' : $('#addSensor fieldset input#inputTurnOffMoisture').val(),

            'turnOnLight' : $('#addSensor fieldset input#inputTurnOnLight').val(),
            'turnOffLight' : $('#addSensor fieldset input#inputTurnOffLight').val(),

            //adapted for Farenheit degrees/Celsius Degrees..harmless if not found on replace...no need for error checking
            'turnOnTemp' : $('#addSensor fieldset input#inputTurnOnTemp').val().replace(' F'+'\xB0','').replace(' C'+'\xB0',''),
            'turnOffTemp' : $('#addSensor fieldset input#inputTurnOffTemp').val().replace(' F'+'\xB0','').replace(' C'+'\xB0',''),
            
            'turnOnTime' : startEpoch,
            'turnOffTime' : endEpoch
        }
        // console.log(newSensor['turnOnTemp']);
        // console.log(newSensor['turnOffTemp']);

        $.ajax({
            type: 'POST',
            data: newSensor,
            url: '/sensors/addsensor',
            dataType: 'JSON'
        }).done(function( response) {
            if(response.msg === '') {
                $('#addSensor fieldset input').val('');
                populateTable();
            }
            else {
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        alert('Please fill in all fields.');
        return false;
    }
};

// Delete Sensor
function deleteSensor(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this sensor?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/sensors/deletesensor/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};
