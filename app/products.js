const logger = require('./logger');
const { httpRequestCounter } = require('./metrics');

const getProducts = (req, res) => {
  httpRequestCounter.inc({ method: req.method, route: '/products' });
  logger.info({ method: req.method, route: '/products' }, 'Fetching products');

  setTimeout(() => {
    res.json([{ id: 1001, name: 'playstation' }, { id: 1002, name: 'monitor' }]);
  }, 100);
};

module.exports = { getProducts };
