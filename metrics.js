const client = require('prom-client');

// Collect default metrics (CPU, memory, etc.)
client.collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route'],
});

const metricsEndpoint = async (req, res) => {
  res.setHeader('Content-Type', client.register.contentType);
  const metrics = await client.register.metrics(); // ⬅ await Promise
  res.end(metrics);
};

module.exports = { httpRequestCounter, metricsEndpoint };
