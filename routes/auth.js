const Users = require('../models/users.js');
const Session = require('../models/sessions.js');

module.exports = (server,module) => {
  server.use((req, res, next) => {
    if(req.cookies['session'] !== undefined) {
      console.log(req.cookies['session']);
      Session.run().filter((session) => {
        return session['id'] == req.cookies['session'];
      }).then((sessions) => {
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

  server.get('/auth/login', (req, res, next) => {
    Users.run().filter((user) => {
      return user['user'] == req.query.user && user['password'] == req.query.password
    }).then((users) => {
      if(users.length) {
        const newSession = new Session({ user: users[0].user });
        newSession.save().then((session) => {
          res.setCookie('session',session['id'],{path:'/'});
          res.send(session['id']);
          next();
        });
      } else {
        res.send("Failed :-(");
        next();
      }
    });
  });

  server.get('/auth/logout', (req, res, next) => {
    res.clearCookie('session',{ path:'/'});
    res.send('OK');
    next();
  });
};
