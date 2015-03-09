# MoistureSensingSprinkler
## Steps to setup Web
1. [Tutorial to setup web interface](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/).
  1. Install node `sudo apt-get install nodejs`
  2. Install express `npm install -g express`
  3. Install global generator `npm install -g express-generator`
  4. Make directory for project `mkdir node`
  5. CD into new directory `cd node`
  6. Create express project `express nodemoistureserver`
  7. CD into new project `cd nodemoistureserver`
  7. Edit node dependencies `vi package.json`
  8. Add mongodb and monk dependencies `"dependencies": { "express": "~4.0.0",
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

