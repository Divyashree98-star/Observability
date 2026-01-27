require('./tracing');  // OpenTelemetry tracing

const express = require('express');
const logger = require('./logger');
const { httpRequestCounter, metricsEndpoint } = require('./metrics');
const { getUsers } = require('./users');
const { getOrders } = require('./orders');
const { getProducts } = require('./products');

const app = express();
const PORT = 3000;

// Home route
app.get('/', (req, res) => {
  httpRequestCounter.inc({ method: req.method, route: '/' });
  logger.info({ method: req.method, route: '/' }, 'Home endpoint called');
  res.send('Welcome to 3-tier Observability App!');
});

// Tier 2 routes
app.get('/users', getUsers);
app.get('/orders', getOrders);
app.get('/products', getProducts);

// Metrics route
app.get('/metrics', metricsEndpoint);

// Start server
app.listen(PORT, () => {
  logger.info('Backend started on http://localhost:' + PORT);
});
