require('dotenv').config({ path: 'w3s-dynamic-storage/.env' });
const express = require("express");
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
  clientApp.use(express.static('dist'));
  clientApp.use(express.json());

  clientApp.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  });
  clientApp.listen(3000, () => console.log('Client listening on port 3000'));
}

app.listen(port, () => console.log(`Listening on port ${port}!`));
console.log("NODE ENV VAR: " + process.env.NODE_ENV);
