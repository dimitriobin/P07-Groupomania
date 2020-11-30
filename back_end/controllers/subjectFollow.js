'use strict'
const { User, Subject } = require('../models');

// Permit a user to follow some subjects
exports.followSubject = (req, res, next) => {
    User.findOne({where: {id: req.params.user_id}})
    .then(user => {
        if(!user){
            return res.status(404).send('User not found')
        }
        Subject.findOne({where: {name: req.body.name}})
        .then(subject => {
            if(!subject){
                return res.status(404).send('Subject not found')
            }
            user.addSubject(subject, {through: 'subjectFollows'})
            .then(res.send('Subject followed'))
            .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
};


exports.readAllFollowsByUser = (req, res, next) => {
    User.findOne({where: {id: req.params.user_id}, include: Subject})
    .then(user => {
        if(!user){
            return res.status(404).send('User not found')
        }
        res.status(200).json(user.Subjects)
    })
    .catch(error => res.status(500).json({ error }))
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