var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const app = express();
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost/mms';
const PORT = process.env.PORT || 3000;
const marker = require('./routes/index')

//connect to MongoDB
mongoose.connect(CONNECTION_URI);
const db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

// parse incoming requests
app.use(bodyParser.json({
    limit: '20mb'
}));

app.use(bodyParser.urlencoded({
    limit: '20mb',
    parameterLimit: 100000,
    extended: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', marker);

module.exports = app;
