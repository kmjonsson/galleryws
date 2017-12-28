const Data = require('./data.js');

module.exports = (server,module) => {
  let base = '/api/' + module;
  server.get(base, (req, res, next) => {
    Data.run().then((posts) => {
      res.send(posts);
    });
    next();
  });

  server.get(base + '/custom', (req, res, next) => {
    Data.run().filter((user) => {
      return user['name'] == 'Ulrika'
    }).then((posts) => {
      res.send(posts);
    });
    next();
  });

  server.post(base + '/create', (req, res, next) => {
    const newData = new Data({
      name: req.params.name,
      fluff: req.params.fluff,
      keywords: [req.params.name,req.params.fluff]
    });

    newData.save().then((x) => {
      console.log(x['id']);
      res.redirect(base, next);
    });
  });

};
