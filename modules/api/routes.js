
module.exports = (server,module) => {
  // index route
  server.get('/api', (req, res) => {
    res.send('Hello ' + req.session.user);
  });
};
