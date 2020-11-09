const express = require('express');
const { Sequelize } = require('sequelize');
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

// Body parsers
app.use(express.json());
app.use(express.urlencoded());


// Routes
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
// app.use('/api/comments', commentsRoute);
app.use('/api/subjects', subjectsRoute);

module.exports = app;