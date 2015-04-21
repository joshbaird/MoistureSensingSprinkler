#!/usr/bin/env python

from chirp import Chirp
from time import sleep
import requests

# global exit flag
exitFlag = False;
################# Functions #####################
# Scan I2C Bus return list of address 0-127
def getSensorAddresses():
	response = requests.get('http://localhost:3000/sensors/sensorlist');
	items =  response.json;
	print items;
	addresses = []
	for item in items:
		if('sensorType' in item):
			if(item['sensorType'] == "i2c"):
				addresses.append(item);
	print addresses;
	return addresses;

# Read Address and POST data to server
def ReadAddressAndPOST(sensor):
	addr = sensor["sensorId"];
	chirp = Chirp(1,addr);
	currentVal = chirp.cap_sense();
	history = sensor["moistureHistory"];
	history.append({"date" : Date().now(), "value" : currentVal});
	json = {"sensorId" : addr,
			"moistureHistory" : history};
	requests.post('http://localhost:3000/sensors/updatesensor', data=json);

# check exitflag
def checkForExit():
	return exitFlag;

################# main loop #####################
sensors = getSensorAddresses();
maxindex = len(sensors);
index = 0;
while (checkForExit()):
	sleep(1);
	ReadAddressAndPOST(sensors[index]);
	index+=1;
	if(index == maxindex):
		sensors = getSensorAddresses();
		maxindex = len(sensors);
		index = 0;