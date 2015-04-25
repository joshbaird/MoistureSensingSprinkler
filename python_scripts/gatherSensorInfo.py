#!/usr/bin/env python

from chirp import Chirp
import time
from time import sleep
import requests
import json

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
	print currentValMoisture;
	if("moistureHistory" in sensor):
		historyM = sensor["moistureHistory"];
	else:
		historyM = [];
	moisture = {};
	moisture["date"] = str(time.time()), 
	moisture["value"] = str(currentValMoisture)
	historyM.append(moisture);
	print historyM;

	#read light
	currentValLight = chirp.cap_sense();
	print currentValLight;
	if("lightHistory" in sensor):
		historyL = sensor["lightHistory"];
	else:
		historyL = [];
	light = {"date" : str(time.time()), "value" : str(currentValLight)};
	historyL.append(light);
	print historyL;

	#read temp
	currentValTemp = chirp.cap_sense();
	print currentValTemp;
	if("tempHistory" in sensor):
		historyT = sensor["tempHistory"];
	else:
		historyT = [];
	temp = {"date" : str(time.time()), "value" : str(currentValTemp)};
	historyT.append(temp);
	print historyT;
	headers = {'content-type': 'application/json'};
	#update all data fields
	js = {
		"sensorId" : addr,
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
	requests.post('http://localhost:3000/sensors/updatesensor', data=json.dumps(js), headers=headers);

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
	
