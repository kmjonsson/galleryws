
const User = require('../../models/users.js');
const Session = require('../../models/sessions.js');

module.exports = (server,module) => {
  // Adds the session object to req object
  server.use((req, res, next) => {
    if(req.cookies.session !== undefined) {
      Session.filter({id: req.cookies.session})
      .run().then((sessions) => {
        if(sessions.length) {
          req.session = sessions[0];
        } else {
          req.session = {"user":"guest"};
        }
        next();
      })
    } else {
      req.session = {"user":"guest"};
      next();
    }
  });

  // Login
  // Checks against the users table
  // TODO: switch to POST
  server.get('/auth/login', (req, res) => {
    User.filter({ user: req.query.user, password: req.query.password })
    .run().then((users) => {
      if(users.length) {
        const newSession = new Session({ user: users[0].user });
        newSession.save().then((session) => {
          res.cookie('session',session['id'],{path:'/'});
          res.send(session['id']);
        });
      } else {
        res.send("Failed :-(");
      }
    });
  });

  // Logout
  server.get('/auth/logout', (req, res) => {
    if(req.session !== undefined && req.session['id'] !== undefined) {
      Session.get(req.session['id']).delete().run();
    }
    res.clearCookie('session',{ path:'/'});
    res.send('OK');
  });
};
