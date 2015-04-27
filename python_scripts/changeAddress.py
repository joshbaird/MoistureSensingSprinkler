#!/usr/bin/env python

from chirp import Chirp
import sys
from time import sleep

fromAddr = str(sys.argv[1]);
toAddr = str(sys.argv[2]);
print "Changing address from: " + fromAddr + ", to: " + toAddr; 

chirp = Chirp(1,int(fromAddr,16));

# change address by writting to register 1 then writing new value follow by a reset.
# 1 = register 1, set address
# 6 = reset
# 7 = get version
print "writing to reg 1";
chirp.write(1);
sleep(0.5);
print "writing new address: " + toAddr;
chirp.write(int(toAddr,16));
sleep(0.5);
print "resetting unit";
chirp.write(6);
sleep(6);
print "testing new address..."
chirp = Chirp(1,int(toAddr,16));
print "read version from new Address: " + str(chirp.get_reg(7));
