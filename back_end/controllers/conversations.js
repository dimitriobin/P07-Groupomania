'use strict'
const { Op } = require('sequelize');
const { Conversation, User, Message } = require('../models');
const jwt = require('jsonwebtoken');

const getUserId = (bearerToken) => {
  const token = bearerToken.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
  const userId = decodedToken.userId;
  if (userId) {
      return userId;
  }
} 

exports.createConversation = (req, res) => {
  const croissantUsersId = JSON.stringify(req.body.sort((a, b) => a - b));
  Conversation.findOrCreate({
    include: [
      { model: Message}
    ],
    where: {
      users: { [Op.like]: croissantUsersId }
    },
    defaults: {
      users: croissantUsersId
    }
  })
  .then((conversation) => res.status(200).json(conversation))
  .catch((error) => res.status(500).json({ error }));
};

exports.createMessage = (req, res) => {
  Conversation.findOne({ where: { id: req.params.id } })
  .then(conversation => {
    if (!conversation) return res.status(404).send('Conversation not found');
    Message.create({
      userId: getUserId(req.headers.authorization),
      conversationId: Number.parseInt(req.params.id),
      ...req.body
    })
    .then(createdMessage => res.status(201).json(createdMessage))
    .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

exports.readAllConversations = (req, res) => {
  Conversation.findAll({
    include: [
      {model: Message, limit: 1, order: [ ['createdAt', 'DESC'] ]}
    ],
    where: {
      [Op.or]: [
        {users: { [Op.like]: `%[${getUserId(req.headers.authorization)},%` }},
        {users: { [Op.like]: `%,${getUserId(req.headers.authorization)},%` }},
        {users: { [Op.like]: `%,${getUserId(req.headers.authorization)}%]` }},
      ], 
    }
  })
  .then(conversations => {
    if (!conversations) return res.status(404).send('Conversations not found');
    res.status(200).json(conversations);
  })
  .catch(error => res.status(500).json({ error }));
};


exports.readOneConversation = (req, res) => {
  Conversation.findOne({
    include: [
      {model: Message}
    ],
    where: { id: req.params.id }
  })
  .then(conversation => {
    if (!conversation) return res.status(404).send('Conversation not found');
    res.status(200).json(conversation);
  })
  .catch(error => res.status(500).json({ error }));
};

exports.updateMessage = (req, res) => {
  Message.findByPk(Number.parseInt(req.params.id))
  .then(message => {
    if(!message) return res.status(404).send('Message not found');
    Message.update({
      ...req.body
    }, {
      where: {
        id: message.id
      }
    })
    .then(() => {
      Message.findByPk(Number.parseInt(req.params.id))
      .then(message => res.status(200).json(message))
      .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

exports.updateAllMessages = (req, res) => {
  console.log(req.body);
  Message.update(req.body.modifications, {
    where: {
      conversationId: Number.parseInt(req.params.id, 10),
      id: req.body.conditions.id,
    }
  })
  .then(() => {
    Message.findAll({
      where: {
        conversationId: Number.parseInt(req.params.id, 10),
        id: req.body.conditions.id,
      }
    })
    .then((messages) => res.status(200).json(messages))
    .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
};

exports.countUnreadMessages = (req, res) => {
  Conversation.findAll({
    where: {
      [Op.or]: [
        {users: { [Op.like]: `%[${getUserId(req.headers.authorization)},%` }},
        {users: { [Op.like]: `%,${getUserId(req.headers.authorization)},%` }},
        {users: { [Op.like]: `%,${getUserId(req.headers.authorization)}%]` }},
      ], 
    }
  })
  .then((conversations) => {
    const conversationsId = [];
    conversations.forEach(conversation => {
      conversationsId.push(conversation.id);
    });
    Message.count({
      where: {
        conversationId: conversationsId,
        userId: {[Op.ne]: getUserId(req.headers.authorization)},
        read: false
      }
    })
    .then(count => res.status(200).json(count))
    .catch((error) => res.status(500).json({ error }));
  })
  .catch((error) => res.status(500).json({ error }));
};