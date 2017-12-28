const db = require('../../db.js');
const type = db.type;

const Users = db.createModel('users', {
  id: type.string(),
  user: type.string(),
  password: type.string()
});

module.exports = Users;
