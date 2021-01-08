'use strict'
const router = require('express').Router();
const auth = require('../middlewares/auth')

const { createConversation, createMessage, readAllConversations, readOneConversation } = require ('../controllers/conversations');


/////////////////////////////////////////////
// CREATE ONE conversation
/////////////////////////////////////////////
router.post('/', auth, createConversation);

/////////////////////////////////////////////
// CREATE ONE message
/////////////////////////////////////////////
router.post('/:id/message', auth, createMessage);

/////////////////////////////////////////////
// READ ALL conversations for one user
/////////////////////////////////////////////
router.get('/', auth, readAllConversations);

/////////////////////////////////////////////
// READ ONE conversation
/////////////////////////////////////////////
router.get('/:id', auth, readOneConversation);

module.exports = router;