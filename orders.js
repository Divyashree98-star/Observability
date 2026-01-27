const logger = require('./logger');
const { httpRequestCounter } = require('./metrics');

const getOrders = (req, res) => {
  httpRequestCounter.inc({ method: req.method, route: '/orders' });
  logger.info({ method: req.method, route: '/orders' }, 'Fetching orders');

  setTimeout(() => {
    res.json([{ id: 101, item: 'Laptop' }, { id: 102, item: 'Phone' }]);
  }, 200);
};

module.exports = { getOrders };
