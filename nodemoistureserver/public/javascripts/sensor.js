
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
		return convertToDisplay(this.turnOnMoisture, this.config.moistureMin, this.config.moistureMax);
	}
	this.setTurnOnMoisture = function(val){
		this.turnOnMoisture = convertToRaw(val, this.config.moistureMin, this.config.moistureMax);
	}
	this.turnOffMoisture = sensor.turnOffMoisture;
	this.getTurnOffMoisture = function(){
		return convertToDisplay(this.turnOffMoisture, this.config.moistureMin, this.config.moistureMax);
	}
	this.setTurnOffMoisture = function(val){
		this.turnOffMoisture = convertToRaw(val, this.config.moistureMin, this.config.moistureMax);
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
		return convertToDisplay(this.turnOnLight, this.config.lightMin, this.config.lightMax);
	}
	this.setTurnOnLight = function(val){
		this.turnOnLight = convertToRaw(val, this.config.lightMin, this.config.lightMax);
	}
	this.turnOffLight = sensor.turnOffLight;
	this.getTurnOffLight = function(){
		return convertToDisplay(this.turnOffLight, this.config.lightMin, this.config.lightMax);
	}
	this.setTurnOffLight = function(val){
		this.turnOffLight = convertToRaw(val, this.config.lightMin, this.config.lightMax);
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
		return convertToDisplay(this.turnOnTemp, this.config.tempMin, this.config.tempMax);
	}
	this.setTurnOnTemp = function(val){
		this.turnOnTemp = convertToRaw(val, this.config.tempMin, this.config.tempMax);
	}
	this.turnOffTemp = sensor.turnOffTemp;
	this.getTurnOffTemp = function(){
		return convertToDisplay(this.turnOffTemp, this.config.tempMin, this.config.tempMax);
	}
	this.setTurnOffTemp = function(val){
		this.turnOffTemp = convertToRaw(val, this.config.tempMin, this.config.tempMax);
	}
	this.tempHistory = sensor.tempHistory;
	this.getTempHistory = function(){
		return this.tempHistory;
	}
	this.setTempHistory = function(val){
		this.tempHistory = val;
	}
}

function convertToRaw(val, min, max){
	return ((float(val)/100) * (float(max) - float(min)) + float(min));
}
function convertToDisplay(val, min, max){
	return ((float(val) - float(min)) / (float(max) - float(min)) * 100);
}

module.exports = Sensor