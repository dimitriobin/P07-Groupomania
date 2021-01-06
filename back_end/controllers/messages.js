'use strict'
const { Message } = require('../models');

exports.createMessage = (req, res, next) => {
  const messageObject = {
    content: '',
    sender_id: '',
    receiver_id: '',
  }
  Message.create(messageObject)
  .then(createdMessage => {
    res.status(201).json(createdMessage);
      // Message.findOne({})
      // .then(message => res.status(201).json(message))
      // .catch(error => res.status(500).json({error}));
  })
  .catch(error => res.status(500).json({error}));
};