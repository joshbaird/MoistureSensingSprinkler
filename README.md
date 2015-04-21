# MoistureSensingSprinkler
## Steps to setup for Pi
1. Setup NPM and web server + Mongodb.
  1. Install node `sudo apt-get install nodejs`
  2. Install express `sudo npm install -g express`
  3. Install global generator `sudo npm install -g express-generator`
  4. Install requests for python `sudo apt-get install python-requests`
  4. Clone repo `git clone https://github.com/joshbaird/MoistureSensingSprinkler.git`
  5. Change directory to clone repo `cd MoistureSensingSprinkler`
  6. Change directory to nodemoistureserver project folder `cd nodemoistureserver`
  7. Install and start MongoDB [duide for pi](https://emersonveenstra.net/mongodb-raspberry-pi/) and a shortcut [script to do this](https://github.com/svvitale/mongo4pi)
  9. install dependencies `npm install`
  10. Create data directory `mkdir data`
  11. Start web server to test `npm start`
  12. Browse to: [http://localhost:3000](http://localhost:3000)
2. Enable I2C on the pi.
  1. remove i2c from blacklist `sudo nano /etc/modprobe.d/raspi-blacklist.conf`
  2. comment out the `blacklist i2c-bcm2708` line to `#blacklist i2c-bcm2708`
  3. Enable kernel i2C module `sudo nano /etc/modules` and add `i2c-dev` to the end
  4. install additional packages, `sudo apt-get update` `sudo apt-get install i2c-tools`, `sudo apt-get install python-smbus`
  5. add pi user to i2c group `sudo adduser pi i2c`
  6. change baud to 1000-3000, start low and work up. `sudo modprobe i2c_bcm2708 baudrate=1000`
  7. reboot pi...
  8. test with command `i2cdetect -y 0`, if that does not work try `i2cdetect -y 1`
