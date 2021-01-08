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
  Conversation.findOne({
    where: {
      [Op.or] : [
        {
          [Op.and] : [
            {userOneId: req.body.userOneId},
            {userTwoId: req.body.userTwoId},
          ]
        },
        {
          [Op.and] : [
            {userTwoId: req.body.userOneId},
            {userOneId: req.body.userTwoId},
          ]
        },
      ]
    }
  })
  .then(alreadyExist => {
    if (alreadyExist) {
      return res.status(404).json({ message: 'This conversation already exist', conversationId: alreadyExist.id });
    }
    Conversation.create({...req.body})
      .then((createdConversation) => {
        Conversation.findOne({
          include: [
            {model: User, as: 'userOne', attributes: ['user_name', 'image_url']},
            {model: User, as: 'userTwo', attributes: ['user_name', 'image_url']},
            {model: Message}
          ],
          where: {
            [Op.and]: [
              {userOneId: createdConversation.userOneId},
              {userTwoId: createdConversation.userTwoId}
            ]
          }
        })
        .then(conversation => {
          res.status(200).json(conversation);
        })
        .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  })
  .catch(error => res.status(500).json({ error }));
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
      {model: User, as: 'userOne', attributes: ['user_name', 'image_url', 'id']},
      {model: User, as: 'userTwo', attributes: ['user_name', 'image_url', 'id']},
      {model: Message, limit: 1, order: [ ['createdAt', 'DESC'] ]}
    ],
    where: {
      [Op.or]: [
        {userOneId: getUserId(req.headers.authorization)},
        {userTwoId: getUserId(req.headers.authorization)}
      ]
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
      {model: User, as: 'userOne', attributes: ['user_name', 'image_url', 'id']},
      {model: User, as: 'userTwo', attributes: ['user_name', 'image_url', 'id']},
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