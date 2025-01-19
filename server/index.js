require('dotenv').config({ path: 'w3s-dynamic-storage/.env' });
const express = require("express");
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set cache headers for favicon.ico and profilepic
app.use((req, res, next) => {
  if (req.url === '/favicon.ico' || req.url.includes('profilepic')) {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
  }
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  else if (req.url.endsWith('.glb')) {
    res.setHeader('Content-Type', 'model/gltf-binary');
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
  }
  next();
});

// API Routes
app.get('/ping', async (req, res) => {
  return res.status(200).send({ ping: true });
});

if (process.env.NODE_ENV === 'development') {
  console.log("Development mode: Proxying to Vite dev server");

  // Proxy API calls
  app.use('/api', (req, res) => {
    res.send({ message: 'API is working!' });
  });

  // Proxy frontend requests to Vite dev server
  app.use(
    '/',
    '/assets',
    createProxyMiddleware({
      target: 'http://localhost:3000', // Vite dev server
      changeOrigin: true,
      ws: true, // Enable WebSocket proxying for HMR
      logLevel: 'debug' // Useful for debugging
    })
  );
}
 else {
  console.log("Production mode: Serving static files");

  // Serve production build
  const clientApp = express();
  clientApp.use(express.static(path.join(__dirname, '../dist')));
  clientApp.use(express.json());

  clientApp.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  });
  clientApp.listen(3000, () => console.log('Client listening on port 3000'));
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
