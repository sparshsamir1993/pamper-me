const proxy = require('http-proxy-middleware')
    
module.exports = function(app) {
    app.use(proxy('/api/', { target: 'http://localhost:5050' }));
    app.use(proxy('/auth/google', { target: 'http://localhost:5050' }));
    // app.use(proxy('/api/admin/restaurants/create', { target: 'http://localhost:5050/api/admin/restaurants/create' }));
  }