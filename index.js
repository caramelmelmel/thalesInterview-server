// requirements
const express = require('express');

const app = express();
const port = 3000;

var bodyParser = require('body-parser');

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
