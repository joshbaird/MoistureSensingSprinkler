#!/usr/bin/env python

from chirp import Chirp
import time
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
	print addr;
	chirp = Chirp(1,int(addr,16));
	# read moisture
	currentValMoisture = chirp.cap_sense();
	if("moistureHistory" in sensor):
		historyM = sensor["moistureHistory"];
	else:
		historyM = [];
	historyM.append({"date" : time.time(), "value" : currentValMoisture});

	#read light
	currentValLight = chirp.cap_sense();
	if("lightHistory" in sensor):
		historyL = sensor["lightHistory"];
	else:
		historyL = [];
	historyL.append({"date" : time.time(), "value" : currentValLight});

	#read temp
	currentValTemp = chirp.cap_sense();
	if("tempHistory" in sensor):
		historyT = sensor["tempHistory"];
	else:
		historyT = [];
	historyT.append({"date" : time.time(), "value" : currentValTemp});

	#update all data fields
	json = {"sensorId" : addr,
			"sensorType" : sensor["sensorType"],
            "pinId" : sensor["pinId"],

            "turnOnTime" : sensor["turnOnTime"],
            "turnOffTime" : sensor["turnOffTime"],

			"turnOnMoisture" : sensor["turnOnMoisture"],
            "turnOffMoisture" : sensor["turnOffMoisture"],
			"moistureHistory" : historyM,

			"turnOnLight" : sensor["turnOnLight"],
            "turnOffLight" : sensor["turnOffLight"],
			"lightHistory" : historyL,

			"turnOnTemp" : sensor["turnOnTemp"],
            "turnOffTemp" : sensor["turnOffTemp"],
			"tempHistory" : historyT
        	};
	requests.post('http://localhost:3000/sensors/updatesensor', data=json);

# check exitflag
def checkForExit():
	return exitFlag;

################# main loop #####################
sensors = getSensorAddresses();
maxindex = len(sensors);
index = 0;
while (~checkForExit()):
	sleep(1);
	if(index >= maxindex):
		sensors = getSensorAddresses();
		maxindex = len(sensors);
		index = 0;
	else:
		ReadAddressAndPOST(sensors[index]);
		index+=1;
	
