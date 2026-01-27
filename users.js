const logger = require('./logger');
const { httpRequestCounter } = require('./metrics');

const getUsers = (req, res) => {
  httpRequestCounter.inc({ method: req.method, route: '/users' });
  logger.info({ method: req.method, route: '/users' }, 'Fetching users');

  // simulate DB latency
  setTimeout(() => {
    res.json([{ id: 1, name: 'Divya' }, { id: 2, name: 'Bhoomi' }]);
  }, 150);
};

module.exports = { getUsers };