require('dotenv').config({ path: 'w3s-dynamic-storage/.env' });
const express = require("express");
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/ping', async (req, res) => {
  return res.status(200).send({ ping: true });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

if (process.env.NODE_ENV !== 'development') {
  const clientApp = express();
  clientApp.use(express.static('dist'));
  clientApp.use(express.json());

  clientApp.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  });
  clientApp.listen(3000, () => console.log('client listening on port 3000'));
}
