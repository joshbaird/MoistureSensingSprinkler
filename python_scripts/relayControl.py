#!/usr/bin/env python

import RPi.GPIO as GPIO
import time
from time import sleep
import requests
GPIO.setmode(GPIO.BOARD);

# global exit flag
exitFlag = False;
sensorPinRunningFlags = {};
################### FUNCTIONS###############
# GET port settings and sensor data from REST server
def getPortSettings(url):
	r = requests.get(url);
	return r.json;

# Check to turn on relay for all sensors
def checkSettings(port):
	return (checkTimeSettings(port) and 
			checkMoistureSettings(port, sensorPinRunningFlags[port["pinId"]]) and 
		   	checkTempSettings(port) and 
		   	checkLightSettings(port) and 
		   	checkWeatherSettings(port);

# check to make sure time falls between on and off
def checkTimeSettings(port):
	print "time now: " + str(time.time());
	print "time on:  " + str(float(port["turnOnTime"])/1000);
	print "time off: " + str(float(port["turnOffTime"])/1000);
	return float(port["turnOnTime"])/1000 < time.time() and float(port["turnOffTime"])/1000 > time.time();

# Moisture turns it on or off based on if its on or off
def checkMoistureSettings(port, runningFlag):
	print "moisture: ";
	currentVal =  port["moistureHistory"][len(port["moistureHistory"]) - 1]["value"]
	print currentVal;
	return (runningFlag) ? int(port["turnOffMoisture"]) < int(currentVal) : int(port["turnOnMoisture"]) > int(currentVal);

# check to make sure temp falls between the on and off
def checkTempSettings(port):
	print "temp: ";
	currentVal =  port["tempHistory"][len(port["tempHistory"]) - 1]["value"];
	print currentVal;
	return int(port["turnOnTemp"]) < int(currentVal) and int(currentVal) < int(port["turnOffTemp"]);
# check to make light falls between the on and off
def checkLightSettings(port):
	print "light: ";
	currentVal =  port["lightHistory"][len(port["lightHistory"]) - 1]["value"];
	print currentVal;
	return int(port["turnOnLight"]) < int(currentVal) and int(currentVal) < int(port["turnOffLight"]) ;

# for now return true. will try and implement later.
def checkWeatherSettings(port):
	return True;

# Turn On Relay by PORT
def turnOnRelay(port):
	print "turning pin: " + str(port["pinId"]) + " on...";
	sensorPinRunningFlags[port["pinId"]] = True;
	GPIO.setup(int(port["pinId"]), GPIO.OUT);
	GPIO.output(int(port["pinId"]), False);
	return;

# Turn Off Relay by PORT
def turnOffRelay(port):
	print "turning pin: " + str(port["pinId"]) + " off...";
	sensorPinRunningFlags[port["pinId"]] = False;
	GPIO.setup(int(port["pinId"]), GPIO.OUT);
	GPIO.output(int(port["pinId"]), True);
	return;
# Delay
def delay(seconds):
	sleep(seconds);
	return;
	
# Checkforexit
def checkForExit():
	return exitFlag;

################## Main loop ###################
while (~checkForExit()):
	values = getPortSettings('http://localhost:3000/sensors/sensorlist');
	for value in values:
		# make sure key exists... if not set set port to stable state and continue.
		if (~sensorPinRunningFlags.has_key(value['pinId'])):
			turnOffRelay(value);
			
		if (checkSettings(value)):
			turnOnRelay(value);
		else:
			turnOffRelay(value);
	delay(5);