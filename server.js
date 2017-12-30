
const express = require('express');
const config = require(`${__dirname}/config.js`);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

// Create restify server
const server = express();

// Handle Cookies
server.use(cookieParser());

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
server.use(bodyParser.json());

// named routes
const routes = [];
config.modules.forEach(module => {
  routes.push(require(`${__dirname}/modules/` + module + `/routes`)(server,module));
});

// start server
server.listen(config.server.port, () => {
  console.log(`${server.name} listening at ${server.url}`);
});
