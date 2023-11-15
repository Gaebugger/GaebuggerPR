const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        '/used',
        createProxyMiddleware({
            target: 'https://localhost:8080',
            changeOrigin: true,
        })
    );
};