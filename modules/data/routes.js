const Data = require('./data.js');
const r = require('../../db.js').r;

module.exports = (server,module) => {
  let base = '/api/' + module;

  server.get(base, (req, res, next) => {
    Data.run().then((posts) => {
      res.send(posts);
    });
  });

  server.get(base + '/custom', (req, res) => {
    Data.run().filter((user) => {
      return user['name'] == 'Ulrika'
    }).then((posts) => {
      res.send(posts);
    });
  });

  server.get(base + '/:id', (req, res) => {
    Data.get(req.params.id)
    .update({
      views: r.row("views").add(1).default(0),
    })
    .run()
    .then((data) => {
      console.log(data);
      res.send(data);
    });
  });

  server.post(base + '/create', (req, res, next) => {
    const newData = new Data({
      name: req.params.name,
      fluff: req.params.fluff,
      keywords: [req.params.name,req.params.fluff]
    });

    newData.save().then((x) => {
      console.log(x['id']);
      res.send(x);
      next();
    });
  });

};
