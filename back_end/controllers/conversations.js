'use strict'
const { Op } = require('sequelize');
const { Conversation, User, Participant, Message } = require('../models');
const jwt = require('jsonwebtoken');

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: conversation } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, conversation, totalPages, currentPage };
};

const getUserId = (bearerToken) => {
  const token = bearerToken.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const userId = decodedToken.userId;
  if (userId) {
      return userId;
  }
} 

/////////////////////////////////////////////
// CREATE ONE conversation
/////////////////////////////////////////////
exports.createConversation = (req, res) => {
  const users = JSON.stringify(req.body.users.sort((a, b) => a - b));
  Conversation.findOne({
    where: {
      users: {[Op.like]: users}
    }
  })
  .then((conversation) => {
    if (conversation) {
      return res.status(200).json({ created: false, conversation})
    }
    const Participants = [];
    req.body.users.forEach(i => Participants.push({UserId: i}));
    // If the conversation doesn't already exist, we create a new conversation,
    // we create new lines in Participant table as well
    Conversation.create({
      users,
      Participants
    }, {
      include: [ Participant ]
    })
    .then((createdConversation) => res.status(200).json({ created: true, createdConversation}))
    .catch((error) => res.status(500).json(error));
  })
  .catch((error) => res.status(500).json(error));
};

/////////////////////////////////////////////
// CREATE ONE message
/////////////////////////////////////////////
exports.createMessage = (req, res) => {
  // First, check if the conversation exist
  Conversation.findOne({ where: { id: req.params.id } })
  .then(conversation => {
    if (!conversation) return res.status(404).send('Conversation not found')
    // Second, check if the user is part of the conversation
    Participant.findOne({
      where: {
        ConversationId: req.params.id,
        UserId: getUserId(req.headers.authorization),
      }
    })
    .then(participant => {
      if (!participant) return res.status(401).send('You are not allowed to join this conversation');
      // Third, create the message, the default value for 'read' will be false
      Message.create({
        ConversationId: req.params.id,
        UserId: getUserId(req.headers.authorization),
        ...req.body
      })
      .then(messageCreated => res.status(201).json(messageCreated))
      .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
  })
  .catch((error) => res.status(500).json(error));
};

/////////////////////////////////////////////
// READ one conversation
/////////////////////////////////////////////
exports.readAllConversationsForOneUser = (req, res) => {
  Conversation.findAll({
    include: [
      { model: Participant, attributes: [] },
      { model: User, attributes: ['id', 'user_name', 'image_url'], through: { attributes: [] } },
      { model: Message, limit: 1, order: [ ['createdAt', 'DESC'] ] }
    ],
    where: {
      '$Participants.UserId$': getUserId(req.headers.authorization)
    }
  })
  .then(conversations => res.status(200).json(conversations))
  .catch((error) => res.status(500).json(error));
};

/////////////////////////////////////////////
// READ ALL messages for ONE conversation
/////////////////////////////////////////////
exports.readAllMessagesForOneConversation = (req, res) => {
  const { page } = req.query;
  const { limit, offset } = getPagination(page);

  Message.findAndCountAll({
    include: [
      { model: User, attributes: ['id', 'user_name', 'image_url'] },
    ],
    distinct: true,
    limit,
    offset,
    where: {
      ConversationId: req.params.id
    },
    order: [
      ['createdAt', 'DESC']
    ],
  })
  .then(conversation => {
    if (!conversation.rows.length) return res.status(404).send('Conversation not found');
    const response = getPagingData(conversation, page, limit);
    res.status(200).json(response);
  })
  .catch(error => res.status(500).json(error));
};

/////////////////////////////////////////////
// UPDATE some messages for one conversation
/////////////////////////////////////////////
exports.updateMessagesByConversation = (req, res) => {
  // First, check if the conversation exist
  Conversation.findOne({ where: { id: req.params.id } })
  .then(conversation => {
    if (!conversation) return res.status(404).send('Conversation not found')
    // Second, check if the user is part of the conversation
    Participant.findOne({
      where: {
        ConversationId: req.params.id,
        UserId: getUserId(req.headers.authorization),
      }
    })
    .then(participant => {
      if (!participant) return res.status(401).send('You are not allowed to join this conversation');
      // Third, update messages that are not read to read
      Message.update({ read: true }, {
        where: {
          ConversationId: req.params.id,
          read: false
        }
      })
      .then(messageUpdated => {
        res.status(200).json(messageUpdated)
      })
      .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
  })
  .catch((error) => res.status(500).json(error));
};

/////////////////////////////////////////////
// DELETE one participant
/////////////////////////////////////////////
exports.deleteParticipant = (req, res) => {
  Conversation.findOne({ where: { id: req.params.id }})
  .then(conversation => {
    if (!conversation) return res.status(404).send('Conversation not found');
    Participant.findOne({
      where: {
        UserId: getUserId(req.headers.authorization),
        ConversationId: req.params.id
      }
    })
    .then(participant => {
      if (!participant) return res.status(404).send('This user is not a participant of this conversation');
      Participant.destroy({
        where: {
          UserId: getUserId(req.headers.authorization),
          ConversationId: req.params.id
        }
      })
      .then(participantDeleted => res.status(200).json(participantDeleted))
      .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
  })
  .catch((error) => res.status(500).json(error));
};

/////////////////////////////////////////////
// DELETE ONE conversation
/////////////////////////////////////////////
exports.deleteConversation = (req, res) => {
  // Check if the conversation exists
  Conversation.findOne({ where: { id: req.params.id }})
  .then(conversation => {
    if (!conversation) return res.status(404).send('Conversation not found');
    // destroy all messages for this conversation
    Message.destroy({ where: { ConversationId: req.params.id } })
    .then(() => {
      // destroy all participants for this conversation
      Participant.destroy({where: { ConversationId: req.params.id } })
      .then(() => {
        // finally destroy the conversation
        Conversation.destroy({ where: { id: req.params.id } })
        .then(deletedConversation => res.status(200).json(deletedConversation))
        .catch((error) => res.status(500).json(error));
      })
      .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
  })
  .catch((error) => res.status(500).json(error));
};