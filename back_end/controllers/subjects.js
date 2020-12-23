'use strict'
const { Subject, User, sequelize } = require('../models');

exports.createOneSubject = (req, res, next) => {
    const subjectObject = {
        ...req.body
    }
    Subject.create(subjectObject)
    .then(createdSubject => {
        res.status(201).send('Subject created');
    })
    .catch(error => {
        res.status(500).json({error});
    })
};


exports.readAllSubjects = (req, res, next) => {
    Subject.findAll({
        include: [
            {model: User}
        ],
        order: [[sequelize.literal(`(SELECT COUNT(*) FROM groupomania.subjectFollows where subject.id = subjectFollows.SubjectId)`), 'DESC']]
    })
    .then(subjects => {
        if(subjects.length <= 0) {
            return res.status(404).send('Subjects not found');
        }
        res.status(200).json(subjects);
    })
    .catch(error => {
        res.status(500).json({error});
    });
    
};


exports.readOneSubject = (req, res, next) => {
    Subject.findOne({where: {id: req.params.id}})
    .then(subject => {
        if(!subject) {
            return res.status(404).send('Subject not found');
        }
        res.status(200).json(subject);
    })
    .catch(error => res.status(500).json({error}))
};


exports.updateOneSubject = (req, res, next) => {
    Subject.findOne({where: {id: req.params.id}})
    .then(subject => {
        if(!subject) {
            return res.status(404).send('Subject not found');
        }
        Subject.update({ ...req.body }, {
            where: {
              id: req.params.id
            }
        })
        .then(updatedSubject => {
            res.status(200).send('Subject updated');
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))
};


exports.deleteOneSubject = (req, res, next) => {
    Subject.findOne({where: {id: req.params.id}})
    .then(subject => {
        if(!subject) {
            return res.status(404).send('Subject not found');
        }
        Subject.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(deletedSubject => {
            res.status(200).send('Subject deleted');
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))
};

// Permit a user to follow some subjects
exports.followSubject = (req, res, next) => {
    User.findOne({where: {id: req.body.userId}})
    .then(user => {
        if(!user){
            return res.status(404).send('User not found')
        }
        Subject.findOne({where: {id: req.params.id}})
        .then(subject => {
            if(!subject){
                return res.status(404).send('Subject not found')
            }
            user.addSubject(subject, {through: 'subjectFollows'})
            .then(() => {
                User.findOne({
                    where: {
                        id: req.body.userId,
                    },
                    include: {
                        model: Subject,
                        where: { id: req.params.id}
                    }
                })
                .then(user => {
                    if(!user){
                        return res.status(404).send('user not found')
                    }
                    res.status(200).json(user.Subjects)
                })
                .catch(error => res.status(500).json({ error }))
            })
            .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
};


exports.readAllFollowsByUser = (req, res, next) => {
    User.findOne({where: {id: req.body.userId}, include: Subject})
    .then(user => {
        if(!user){
            return res.status(404).send('Subject not found')
        }
        res.status(200).json(user.Subjects)
    })
    .catch(error => res.status(500).json({ error }))
};



exports.unFollowSubject = (req, res, next) => {
    User.findOne({where: {id: req.body.userId}})
    .then(user => {
        if(!user){
            return res.status(404).send('User not found')
        }
        Subject.findOne({where: {id: req.params.id}})
        .then(subject => {
            if(!subject){
                return res.status(404).send('Subject not found')
            }
            user.removeSubject(subject, {through: 'subjectFollows'})
            .then(unFollow => {
                res.status(200).json(unFollow);
            })
            .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
};