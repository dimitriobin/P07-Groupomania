'use strict'
const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createConversation,
  createMessage,
  readAllConversationsForOneUser,
  readAllMessagesForOneConversation,
  countAllUnreadMessagesByUser,
  updateMessagesByConversation,
  deleteParticipant,
  deleteConversation
} = require('../controllers/conversations');



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
router.get('/', auth, readAllConversationsForOneUser);

/////////////////////////////////////////////
// READ ONE conversation
/////////////////////////////////////////////
router.get('/:id', auth, readAllMessagesForOneConversation);

/////////////////////////////////////////////
// READ the count of all unread messages for one user
/////////////////////////////////////////////
router.get('/messages/unread', auth, countAllUnreadMessagesByUser);

/////////////////////////////////////////////
// UPDATE ALL unread messages for one conversation
/////////////////////////////////////////////
router.put('/:id/read', auth, updateMessagesByConversation);

/////////////////////////////////////////////
// DELETE one participant
/////////////////////////////////////////////
router.delete('/:id/participant', auth, deleteParticipant);

/////////////////////////////////////////////
// DELETE ONE conversation
/////////////////////////////////////////////
router.delete('/:id', auth, deleteConversation);

module.exports = router;