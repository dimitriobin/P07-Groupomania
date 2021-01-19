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
router.post('/', createConversation);

/////////////////////////////////////////////
// CREATE ONE message
/////////////////////////////////////////////
router.post('/:id/message', createMessage);

/////////////////////////////////////////////
// READ ALL conversations for one user
/////////////////////////////////////////////
router.get('/', readAllConversationsForOneUser);

/////////////////////////////////////////////
// READ ONE conversation
/////////////////////////////////////////////
router.get('/:id', readAllMessagesForOneConversation);

/////////////////////////////////////////////
// READ the count of all unread messages for one user
/////////////////////////////////////////////
router.get('/messages/unread', countAllUnreadMessagesByUser);

/////////////////////////////////////////////
// UPDATE ALL unread messages for one conversation
/////////////////////////////////////////////
router.put('/:id/read', updateMessagesByConversation);

/////////////////////////////////////////////
// DELETE one participant
/////////////////////////////////////////////
router.delete('/:id/participant', deleteParticipant);

/////////////////////////////////////////////
// DELETE ONE conversation
/////////////////////////////////////////////
router.delete('/:id', deleteConversation);

module.exports = router;