const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();


//Get Express working the way you want to, the following are two middlewares
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));

//Get Express app to talk to outside world
const port = process.env.PORT || 3090;
const server = http.createServer(app); //http is native node library low-level
server.listen(port);
console.log('Server listening on:', port);
