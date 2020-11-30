'use strict'
const express = require('express');
const fs = require('fs');
const path = require('path');

const { Sequelize } = require('sequelize');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express');
const toobusy = require('toobusy-js');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
require('dotenv').config();

const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const commentsRoute = require('./routes/comments');
const subjectsRoute = require('./routes/subjects');
const subjectFollowsRoute = require('./routes/subjectFollows');

const app = express();


///////////////////////////////////
// database setup and testing
///////////////////////////////////
const db = require('./models');
// Test database
db.sequelize.authenticate()
.then(() => console.log('Database connected ...'))
.catch(err => console.log(err));

//////////////////////////////////////////////
// Serve static assets
//////////////////////////////////////////////
app.use('/images', express.static(path.join(__dirname, 'images')));


//////////////////////////////////////////////
// Set up a logger with morgan
//////////////////////////////////////////////
// log all errors to errors.log
app.use(morgan('common', {
    stream: fs.createWriteStream('./logging/errors.log', { flags: 'a' }),
    skip: function (req, res) { return res.statusCode < 400 }
  }));
// log all requests to access.log
app.use(morgan('common', {
stream: fs.createWriteStream('./logging/access.log', { flags: 'a' })
}));


//////////////////////////////////////////////
// Set up CORS 
//////////////////////////////////////////////
app.use(cors());


//////////////////////////////////////////////
// body parsers
//////////////////////////////////////////////
app.use(express.urlencoded({
    limit: "1kb",
    extended: false
}));
app.use(express.json({
    limit: "1kb"
}));


//////////////////////////////////////////////
// Set some secure headers with helmet.js
//////////////////////////////////////////////
app.use(helmet());


//////////////////////////////////////////////
// Express Session Middleware
//////////////////////////////////////////////
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        sameSite: true
    }
}));

//////////////////////////////////////////////
// Secure the event-loop against DoS attacks
//////////////////////////////////////////////
app.use((req, res, next) => {
    if (toobusy()) {
        // log if you see necessary
        res.send(503, "Server Too Busy");
    } else {
    next();
    }
});

//////////////////////////////////////////////
// Create a rate limitation
//////////////////////////////////////////////
const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});


//////////////////////////////////////////////
// Slow down each requests made back to back to discourage spamming the API
//////////////////////////////////////////////
const speedLimiter = slowDown({
    windowMs: 30 * 1000, // 30 sec
    delayAfter: 10, // allow 10 requests per 30 seconds, then...
    delayMs: 500 // begin adding 500ms of delay per request above 100:
});


/////////////////////////////////////////////
// docs config
/////////////////////////////////////////////
try {
    const docsSpec = yaml.safeLoad(fs.readFileSync('./docs-spec.yml', 'utf8'));
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(docsSpec));
} catch (e) {
    console.log(e);
}


// Routes
app.use('/api/users',rateLimiter, speedLimiter, usersRoute);
app.use('/api/comments',rateLimiter, speedLimiter, commentsRoute);
app.use('/api/posts',rateLimiter, speedLimiter, postsRoute);
app.use('/api/subjects',rateLimiter, speedLimiter, subjectsRoute);
app.use('/api/follows',rateLimiter, speedLimiter, subjectFollowsRoute);

module.exports = app;