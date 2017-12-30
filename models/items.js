const db = require('../db.js');
const type = db.type;

const Item = db.createModel('items', {
  id: type.string(),
  type: type.string(),
  path: type.string(),
  md5: type.string(),
  //keywords: type.array().schema(type.string())
});


module.exports = Item;
