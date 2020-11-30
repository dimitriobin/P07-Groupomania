'use strict'
const { User, Subject } = require('../models');

// Permit a user to follow some subjects
exports.followSubject = (req, res, next) => {
    User.findOne({where: {id: req.params.user_id}})
    .then(user => {
        Subject.findOne({where: {name: req.body.name}})
        .then(subject => {
            user.addSubject(subject, {through: 'subjectFollows'})
            .then(res.send('Subject followed'))
        })
    })
};


exports.readAllFollowsByUser = (req, res, next) => {
    User.findOne({where: {id: req.params.user_id}, include: Subject})
    .then(user => {
        res.status(200).json(user.Subjects)
    })
};



exports.unFollowSubject = (req, res, next) => {
    User.findOne({where: {id: req.params.user_id}})
    .then(user => {
        Subject.findOne({where: {name: req.body.name}})
        .then(subject => {
            user.removeSubject(subject, {through: 'subjectFollows'})
            .then(res.send('Subject unfollowed'))
        })
    })
};