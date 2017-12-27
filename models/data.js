const db = require('../db.js');
const type = db.type;

const Data = db.createModel('data', {
  id: type.string(),
  name: type.string(),
  fluff: type.string(),
  keywords: type.array().schema(type.string())
});


module.exports = Data;
