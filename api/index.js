// Vercel serverless entrypoint for the Fizzora Node application.
const { server, initialize } = require('../server');
initialize();
module.exports = server.listeners('request')[0];
