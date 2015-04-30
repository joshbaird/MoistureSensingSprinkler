
function Sensor(sensor, config_){
	this.config = config_;
	this.sensorID = sensor.sensorID;
	this.getSensorID = function(){
		return this.sensorID;
	}
	this.setSensorID = function(val){
		this.sensorID = val;
	}

	this.sensorType = sensor.sensorType;
	this.getSensorType = function(){
		return this.sensorType;
	}
	this.setSensorType = function(val){
		this.sensorType = val;
	}

	this.pinID =  sensor.pinID;
	this.getPinID = function(){
		return this.pinID;
	}
	this.setPinID = function(val){
		this.pinID = val;
	}

	this.turnOnTime =  sensor.turnOnTime;
	this.getTurnOnTime = function(){
		return this.turnOnTime;
	}
	this.setTurnOnTime = function(val){
		this.turnOnTime = val;
	}
	this.turnOffTime =  sensor.turnOffTime;
	this.getTurnOffTime = function(){
		return this.turnOffTime;
	}
	this.setTurnOffTime = function(val){
		this.turnOffTime = val;
	}

	this.turnOnMoisture = sensor.turnOnMoisture;
	this.getTurnOnMoisture = function(){
		return this.turnOnMoisture;
	}
	this.setTurnOnMoisture = function(val){
		this.turnOnMoisture = val;
	}
	this.turnOffMoisture = sensor.turnOffMoisture;
	this.getTurnOffMoisture = function(){
		return this.turnOffMoisture;
	}
	this.setTurnOffMoisture = function(val){
		this.turnOffMoisture = val;
	}
	this.moistureHistory = sensor.moistureHistory;
	this.getMoistureHistory = function(){
		return this.moistureHistory;
	}
	this.setMoistureHistory = function(val){
		this.moistureHistory = val;
	}

	this.turnOnLight = sensor.turnOnLight;
	this.getTurnOnLight = function(){
		return this.turnOnLight;
	}
	this.setTurnOnLight = function(val){
		this.turnOnLight = val;
	}
	this.turnOffLight = sensor.turnOffLight;
	this.getTurnOffLight = function(){
		return this.turnOffLight;
	}
	this.setTurnOffLight = function(val){
		this.turnOffLight = val;
	}
	this.lightHistory = sensor.lightHistory;
	this.getLightHistory = function(){
		return this.lightHistory;
	}
	this.setLightHistory = function(val){
		this.lightHistory = val;
	}

	this.turnOnTemp = sensor.turnOnTemp;
	this.getTurnOnTemp = function(){
		return this.turnOnTemp;
	}
	this.setTurnOnTemp = function(val){
		this.turnOnTemp = val;
	}
	this.turnOffTemp = sensor.turnOffTemp;
	this.getTurnOffTemp = function(){
		return this.turnOffTemp;
	}
	this.setTurnOffTemp = function(val){
		this.turnOffTemp = val;
	}
	this.tempHistory = sensor.tempHistory;
	this.getTempHistory = function(){
		return this.tempHistory;
	}
	this.setTempHistory = function(val){
		this.tempHistory = val;
	}
}
