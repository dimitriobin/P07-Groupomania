const express = require('express')

const usersRoute = require('./routes/users')
const postsRoute = require('./routes/posts')

const app = express();

// Body parsers
app.use(express.json())
app.use(express.urlencoded())


// Routes
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);

module.exports = app;