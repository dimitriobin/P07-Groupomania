const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');

const app = express();

// Connect to database
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});
db.authenticate()
.then(() => console.log('Database connected ...'))
.catch(err => console.log(err));

// Body parsers
app.use(express.json());
app.use(express.urlencoded());


// Routes
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);

module.exports = app;