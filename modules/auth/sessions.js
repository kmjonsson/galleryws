const db = require('../../db.js');
const type = db.type;

const Sessions = db.createModel('sessions', {
  id: type.string(),
  user: type.string()
});

module.exports = Sessions;
