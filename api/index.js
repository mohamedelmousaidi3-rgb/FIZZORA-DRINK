
const { server } = require('../server');

module.exports = function handler(req, res) {
  server.emit('request', req, res);
};
