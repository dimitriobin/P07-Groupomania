const express = require('express');
const fs = require('fs');

const { Sequelize } = require('sequelize');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const commentsRoute = require('./routes/comments');
const subjectsRoute = require('./routes/subjects');

const app = express();

// database
const db = require('./models');
// Test database
db.sequelize.authenticate()
.then(() => console.log('Database connected ...'))
.catch(err => console.log(err));

//////////////////////////////////////////////
// Set up a logger with morgan
//////////////////////////////////////////////
// log all errors to errors.log
app.use(morgan('common', {
    stream: fs.createWriteStream('./logging/errors.log', { flags: 'a' }),
    skip: function (req, res) { return res.statusCode < 400 }
  }));
   
//////////////////////////////////////////////
// Set up CORS 
//////////////////////////////////////////////
app.use(cors());

// log all requests to access.log
app.use(morgan('common', {
stream: fs.createWriteStream('./logging/access.log', { flags: 'a' })
}));


// Body parsers
app.use(express.json());
app.use(express.urlencoded());


// Routes
app.use('/api/users', usersRoute);
app.use('/api/comments', commentsRoute);
app.use('/api/posts', postsRoute);
app.use('/api/subjects', subjectsRoute);

module.exports = app;