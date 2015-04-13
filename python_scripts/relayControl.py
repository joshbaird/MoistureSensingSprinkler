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
	if(port["turnOn"] > port["currentVal"] && port["turnOff"] < port["currentVal"]):
		turnOnRelay(port);
	else:
		turnOffRelay(port);
	return;

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
		checkSettings(value);
	delay(10);
	checkForExit();