const db = require('../db.js');
const type = db.type;

const Session = db.createModel('sessions', {
  id: type.string(),
  user: type.string()
});

module.exports = Session;
