# MoistureSensingSprinkler
## Steps to setup Web
1. [Tutorial to setup web interface](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/).
  1. Install node `sudo apt-get install nodejs`
  2. Install express `sudo npm install -g express`
  3. Install global generator `sudo npm install -g express-generator`
  4. Clone repo `git clone https://github.com/joshbaird/MoistureSensingSprinkler.git` 
  5. Change directory to clone repo `cd MoistureSensingSprinkler`
  6. Change directory to nodemoistureserver project folder `cd nodemoistureserver`
  7. Verify node dependencies `vi package.json`
  8. Verify mongodb and monk dependencies `"dependencies": { "express": "~4.0.0",
    "serve-favicon": "~2.1.3",
    "morgan": "~1.0.0",
    "cookie-parser": "~1.0.1",
    "body-parser": "~1.0.0",
    "debug": "~0.7.4",
    "jade": "~1.3.0",
    "mongodb": "*",
    "monk": "*"
}`
  9. install dependencies `npm install`
  10. Create data directory `mkdir data`
  11. Start web server to test `npm start`
  12. Browse to: [http://localhost:3000](http://localhost:3000)
2. [Tutorial to setup restful API](http://cwbuecheler.com/web/tutorials/2014/restful-web-app-node-express-mongodb/)
3. Enable I2C on the pi.
  1. remove i2c from blacklist `sudo nano /etc/modprobe.d/raspi-blacklist.conf`
  2. comment out the `blacklist i2c-bcm2708` line to `#blacklist i2c-bcm2708`
  3. Enable kernel i2C module `sudo nano /etc/modules` and add `i2c-dev` to the end
  4. install additional packages, `sudo apt-get update` `sudo apt-get install i2c-tools`, `sudo apt-get install python-smbus`
  5. add pi user to i2c group `sudo adduser pi i2c`
  6. change baud to 1000-3000, start low and work up. `sudo modprobe i2c_bcm2708 baudrate=1000`
  7. reboot pi...
  8. test with command `i2cdetect -y 0`, if that does not work try `i2cdetect -y 1`

## Link to git for CHIRP sensor
[chirp-graphite](https://github.com/JasperWallace/chirp-graphite)
