const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy API requests - must match /api exactly
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8001',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api', // keep /api prefix
      },
    })
  );

  // Proxy Socket.io with WebSocket support
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'http://localhost:8001',
      changeOrigin: true,
      ws: true,
      logLevel: 'debug',
    })
  );
};
