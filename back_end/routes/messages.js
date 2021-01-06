'use strict'
const router = require('express').Router();
const auth = require('../middlewares/auth')

const { createMessage } = require ('../controllers/messages');

/////////////////////////////////////////////
// CREATE ONE Comment
/////////////////////////////////////////////
router.post('/', auth, createMessage);


module.exports = router;