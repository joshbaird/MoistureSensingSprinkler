// SensorList Data
var sensorListData = [];

// DOM ready
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
    
    // Sensor Address link click
    $('#sensorList table tbody').on('click', 'td a.linkshowsensor', showSensorInfo);

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
