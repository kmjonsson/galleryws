const Item = require('../../models/items.js');
const r = require('../../db.js').r;

module.exports = (server,module) => {
  let base = '/api/' + module;

  server.get(base, (req, res, next) => {
    Item.run().then((posts) => {
      res.send(posts);
    });
  });

  server.get(base + '/custom', (req, res) => {
    Item.run().filter((user) => {
      return user['name'] == 'Ulrika'
    }).then((posts) => {
      res.send(posts);
    });
  });

  server.get(base + '/:id', (req, res) => {
    Item.get(req.params.id)
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
    const newItem = new Item({
      name: req.params.name,
      fluff: req.params.fluff,
      keywords: [req.params.name,req.params.fluff]
    });

    newItem.save().then((x) => {
      console.log(x['id']);
      res.send(x);
      next();
    });
  });

};
