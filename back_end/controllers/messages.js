'use strict'
const { Message } = require('../models');

exports.createMessage = (req, res, next) => {
  Message.create({...req.body})
  .then(createdMessage => {
    res.status(201).json(createdMessage);
  })
  .catch(error => res.status(500).json({error}));
};