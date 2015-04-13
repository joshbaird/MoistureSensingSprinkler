#!/usr/bin/env python

from chirp import Chirp
from time import sleep
import requests

# global exit flag
exitFlag = False;
################# Functions #####################
# Scan I2C Bus return list of address 0-127
def scanBus():
	addresses = []
	for addr in range(0, 127):
		chirp = Chirp(1,addr);
		# call to get version
		chirp.write(0x07);
		val = chirp.read();
		if(val === None):
			continue;
		else:
			addresses.append(addr);
	return addresses;

# Read Address and POST data to server
def ReadAddressAndPOST(addr):
	chirp = Chirp(1,addr);
	currentVal = chirp.cap_sense();
	json = {"address" : addr,
			"currentVal" : currentVal};
	requests.post("localhost:3000/sensors/addsensor", data=json);

# check exitflag
def checkForExit():
	return exitFlag;

################# main loop #####################

while (checkForExit()):
