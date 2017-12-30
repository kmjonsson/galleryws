const db = require('../db.js');
const type = db.type;

const User = db.createModel('users', {
  id: type.string(),
  user: type.string(),
  password: type.string(),
  admin: type.boolean().default(false)
});

module.exports = User;
