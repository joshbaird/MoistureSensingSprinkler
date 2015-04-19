#!/usr/bin/env python

import RPi.GPIO as GPIO
from time import sleep
import requests

# global exit flag
exitFlag = False;
################### FUNCTIONS###############
# GET port settings and sensor data from REST server
def getPortSettings(url):
	r = requests.get(url);
	return r.json();

# Check to turn on relay for all sensors
def checkSettings(port):
	return checkTimeSettings(port) && checkMoistureSettings(port) && checkTempSettings(port) && checkLightSettings(port) && checkWeatherSettings(port);

def checkTimeSettings(port):
	return port["turnOnTime"] > Date().now() && port["turnOffMoisture"] < Date().now():

def checkMoistureSettings(port):
	return port["turnOnMoisture"] > port["moistureHistory"][port["moistureHistory"].length - 1]["value"] && port["turnOffMoisture"] < port["moistureHistory"][port["moistureHistory"].length - 1]["value"];

def checkTempSettings(port):
	return port["turnOnTemp"] > port["tempHistory"][port["tempHistory"].length - 1]["value"] && port["turnOffTemp"] < port["tempHistory"][port["tempHistory"].length - 1]["value"];

def checkLightSettings(port):
	return port["turnOnLight"] > port["lightHistory"][port["lightHistory"].length - 1]["value"] && port["turnOffLight"] < port["lightHistory"][port["lightHistory"].length - 1]["value"];

# for now return true. will try and implement later.
def checkWeatherSettings(port):
	return True;

# Turn On Relay by PORT
def turnOnRelay(port):
	GPIO.setup(port, GPIO.OUT);
	GPIO.output(port, False);
	return;

# Turn Off Relay by PORT
def turnOffRelay(port):
	GPIO.setup(port, GPIO.OUT);
	GPIO.output(port, True);
	return;
# Delay
def delay(seconds):
	sleep(seconds);
	return;
	
# Checkforexit
def checkForExit():
	return exitFlag;

################## Main loop ###################
while (checkForExit()):
	values = getPortSettings("localhost:3000/sensors/sensorlist");
	for value in values:
		if (checkSettings(value)):
			turnOnRelay(value);
		else:
			turnOffRelay(value);
	delay(5);
	checkForExit();