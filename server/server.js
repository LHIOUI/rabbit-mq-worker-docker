'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const job = require('./job');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World');
});

(async ()=>{
  await job.init();
})();

app.post('/job',async(req,res)=>{
  await job.start(req.body);
  res.send('ok');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);