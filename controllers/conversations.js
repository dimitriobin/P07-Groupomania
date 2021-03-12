'use strict'
const { Op } = require('sequelize');
const { Conversation, User, Participant, Message } = require('../models');
const jwt = require('jsonwebtoken');

const getPagination = (page, size) => {
    const limit = size ? +size : 20;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalMessages, rows: Messages } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalMessages / limit);

    return { totalMessages, Messages, totalPages, currentPage };
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
    .then((createdConversation) => {
      Conversation.findOne({
        include: [
          { model: Participant, attributes: [] },
          { model: User, attributes: ['id', 'user_name', 'image_url'], through: { attributes: [] } },
          { model: Message, limit: 1, order: [ ['createdAt', 'DESC'] ] }
        ],
        where: { id: createdConversation.id }
      })
      .then((conversation) => res.status(201).json({ created: true, conversation}))
      .catch((error) => res.status(500).json(error));
    })
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
        ConversationId: Number.parseInt(req.params.id, 10),
        UserId: getUserId(req.headers.authorization),
        ...req.body
      })
      .then(messageCreated => {
        res.status(201).json(messageCreated);
      })
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

  Conversation.findOne({ where: {id: req.params.id }})
  .then(conversation => {
    if (!conversation) return res.status(404).send('Conversation not found');
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
        ['createdAt', 'DESC'],
        ['id', 'DESC']
      ],
    })
    .then(messages => {
      const response = getPagingData(messages, page, limit);
      res.status(200).json(response);
    })
    .catch(error => res.status(500).json(error));
  })
  .catch(error => res.status(500).json(error));

};

/////////////////////////////////////////////
// READ the count of all unread messages for a user
/////////////////////////////////////////////
exports.countAllUnreadMessagesByUser = (req, res) => {
  User.findOne({
    include: [
      { model: Conversation, attributes: ['id'], through: {attributes: []} }
    ],
    where: {
      id: getUserId(req.headers.authorization)
    },
    attributes: []
  })
  .then(response => {
    const conversationsId = response.Conversations.map(i => i.id)
    Message.count({
      where: {
        ConversationId: conversationsId,
        UserId: { [Op.ne]: getUserId(req.headers.authorization) },
        read: false
      }
    })
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error })
    });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error })
  });
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
          read: false,
          UserId: { [Op.ne]: getUserId(req.headers.authorization) },
        }
      })
      .then((updated) => {
        Message.findOne({
          where: {
            ConversationId: req.params.id,
            read: true,
            UserId: { [Op.ne]: getUserId(req.headers.authorization) },
          },
          order: [
            ['createdAt', 'DESC']
          ]
        })
        .then(lastRead => {
          res.status(200).json({lastRead, updated});
        })
        .catch((error) => res.status(500).json(error));
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