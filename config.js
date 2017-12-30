module.exports = {
  // RethinkDB params
  rethinkdb: {
    host: 'localhost',
    port: 28015,
    db: 'testing'
  },

  // ExpressJS server params
  server: {
    port: 8000
  },

  // Load this modules/routes
  modules: [
    'auth', // Must be first, populates session
    'api',
    'items',
    'image'
  ]
};
