module.exports = {
  // Restify params
  rethinkdb: {
    host: 'localhost',
    port: 28015,
    db: 'testing'
  },

  // Restify server params
  server: {
    name: 'testing-api',
    port: 8000
  },

  // Load this modules/routes
  modules: [
    'auth', // Must be first
    'api',
    'data'
  ]
};
