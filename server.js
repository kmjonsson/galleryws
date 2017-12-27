
const CookieParser = require('restify-cookies');
const restify = require('restify');
const config = require(`${__dirname}/config.js`);

// Create restify server
const server = restify.createServer({ name: config.server.name });

// Handle Cookies
server.use(CookieParser.parse);

// use restify's bodyParser (post)
server.use(restify.plugins.bodyParser({ mapParams: true }));

// use restify's queryParser (get?foo=bar)
server.use(restify.plugins.queryParser());

// named routes
const routes = [];
config.modules.forEach(module => {
  routes.push(require(`${__dirname}/routes/` + module)(server,module));
});

// start server
server.listen(config.server.port, () => {
  console.log(`${server.name} listening at ${server.url}`);
});
