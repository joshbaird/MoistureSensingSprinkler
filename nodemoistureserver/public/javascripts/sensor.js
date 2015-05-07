
function Sensor(sensor, config_){
	this.config = config_;
	this._id = sensor._id;
	this.sensorId = sensor.sensorId;
	this.getSensorId = function(){
		return this.sensorId;
	}
	this.setSensorId = function(val){
		this.sensorId = val;
	}

	this.sensorType = sensor.sensorType;
	this.getSensorType = function(){
		return this.sensorType;
	}
	this.setSensorType = function(val){
		this.sensorType = val;
	}

	this.pinId =  sensor.pinId;
	this.getPinId = function(){
		return this.pinId;
	}
	this.setPinId = function(val){
		this.pinId = val;
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
	this.getCurrentMoisture = function(){
		if(this.moistureHistory != undefined)
			return this.moistureHistory[this.moistureHistory.length - 1];
		return {};
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
	this.getCurrentLight = function(){
		if(this.lightHistory != undefined)
			return this.lightHistory[this.lightHistory.length - 1];
		return {};
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
	this.getCurrentTemp = function(){
		if(this.tempHistory != undefined);
			return this.tempHistory[this.tempHistory.length - 1];
		return {};
	}

	this.getJSONData = function(){
		return {
            'sensorId': this.sensorId,
            'sensorType': this.sensorType,
            'pinId': this.pinId,
            'turnOnMoisture': this.turnOnMoisture,
            'turnOffMoisture': this.turnOffMoisture,
            'turnOnLight': this.turnOnLight,
            'turnOffLight': this.turnOffLight,
            'turnOnTemp': this.turnOnTemp,
            'turnOffTemp': this.turnOffTemp,
            'turnOnTime': this.turnOnTime,
            'turnOffTime': this.turnOffTime
		};
	}
}

function convertToRaw(val, min, max){
	return ((parseFloat(val)/100) * (parseFloat(max) - parseFloat(min)) + parseFloat(min));
}
function convertToDisplay(val, min, max){
	return ((parseFloat(val) - parseFloat(min)) / (parseFloat(max) - parseFloat(min)) * 100);
}
