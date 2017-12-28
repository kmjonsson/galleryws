
module.exports = (server,module) => {
  // index route
  server.get('/api', (req, res, next) => {
    res.send('Hello ' + req.session.user);
    next();
  });
};
