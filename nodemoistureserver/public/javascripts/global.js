// SensorList Data
var sensorListData = [];

// DOM ready
$(document).ready(function() {

    var datepickersOpt = {
       // dateFormat: 'dd-mm-yy',
        minDate   : 0,
        'format': 'm/d/yyyy',
        'autoclose': true
    }


    $('#basicExample .time').timepicker({
        'showDuration': false,
        'timeFormat': 'g:ia'
    });

    $('.date').datepicker($.extend({
        onSelect: function() {
            var minDate = $(this).datepicker('getDate');
            minDate.setDate(minDate.getDate()+2); //add two days
            $("#to_date").datepicker( "option", "minDate", minDate);
        }
    },datepickersOpt));



    //need to work on part for converting to UTF for mongodb store


    // initialize datepair
    var basicExampleEl = document.getElementById('basicExample');
    var datepair = new Datepair(basicExampleEl);
    

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
            tableContent += '<td><a href="#" class="linkshowsensor" rel="' + this.address + '">' + this.address + '</a></td>';
            tableContent += '<td>' + this.turnOn + '</td>';
            tableContent += '<td>' + this.turnOff + '</td>';
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
    var thisSensorAddress = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = sensorListData.map(function(arrayItem) { return arrayItem.address; }).indexOf(thisSensorAddress);
    // Get our Sensor Object
    var thisSensorObject = sensorListData[arrayPosition];

    //Populate Info Box
    $('#sensorInfoAddress').text(thisSensorObject.address);
    $('#sensorInfoTurnOn').text(thisSensorObject.turnOn);
    $('#sensorInfoTurnOff').text(thisSensorObject.turnOff);
};


// Add Sensor
function addSensor(event) {
    event.preventDefault();
    var errorCount = 0;
    $('#addSensor input').each(function(index, val) {
        if($(this).val() === '') { errorCount++;}
    });

    // check errorCount is 0
    if(errorCount === 0) {
        var newSensor = {
            'address' : $('#addSensor fieldset input#inputAddress').val(),
            'turnOn' : $('#addSensor fieldset input#inputTurnOn').val(),
            'turnOff' : $('#addSensor fieldset input#inputTurnOff').val()
        }

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
