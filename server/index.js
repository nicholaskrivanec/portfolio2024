require('dotenv').config({ path: 'w3s-dynamic-storage/.env' });
const express = require("express");
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3001;
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Set cache headers for static assets to avoid unnecessary reloads
app.use((req, res, next) => {
  if (req.url.match(/\.(ico|png|svg|glb)$/)) 
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  if (req.url.endsWith('.js')) 
    res.setHeader('Content-Type', 'application/javascript');
  if (req.url.endsWith('.glb')) 
    res.setHeader('Content-Type', 'model/gltf-binary');

  next();
});



// API Routes
app.get('/ping', async (req, res) => {
  return res.status(200).send({ ping: true });
});
console.log(process.env.PORT)
if (process.env.NODE_ENV === 'development') {
  console.log("Development mode: Proxying to Vite dev server");

  // Proxy API calls
  app.use('/api', (req, res) => {
    res.send({ message: 'API is working!' });
  });

  // Proxy frontend requests to Vite dev server
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:3000', 
      changeOrigin: true,
      ws: true, 
      logLevel: 'debug',
      onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying request to: http://localhost:3000${req.url}`);
      },
      onError: (err, req, res) => {
        console.error('Proxy error:', err.message);
        res.status(500).send('Proxy server error');
      }
    })
  );
} else {
  console.log("Production mode: Serving static files");

  // Serve production build with caching improvements
  app.use(express.static(path.join(__dirname, '../dist'), {
    maxAge: '1y', // Cache for 1 year
    etag: false,  // Disable ETag to avoid revalidation
    immutable: true  // Instruct the browser that files won't change
  }));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  });

  // Production server listening on port 3000
  app.listen(3000, () => console.log('Client listening on port 3000'));
}

// Start the backend server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
