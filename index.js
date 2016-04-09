const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//DB Setup, creates db called auth
mongoose.connect('mongodb://localhost:auth/auth');

//Get Express working the way you want to, the following are two middlewares
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//Get Express app to talk to outside world
const port = process.env.PORT || 3090;
const server = http.createServer(app); //http is native node library low-level
server.listen(port);
console.log('Server listening on:', port);
