const Subject = require('../models/Subject');
const db =  require('../config/database');

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
    Subject.findAll()
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
    Subject.findAll({where: {subject_id: req.params.subject_id}})
    .then(subject => {
        if(subject.length <= 0) {
            return res.status(404).send('Subject not found');
        }
        res.status(200).json(subject);
    })
    .catch(error => res.status(500).json({error}))
};


exports.updateOneSubject = (req, res, next) => {
    Subject.findAll({where: {subject_id: req.params.subject_id}})
    .then(subject => {
        if(subject.length <= 0) {
            return res.status(404).send('Subject not found');
        }
        Subject.update({ ...req.body }, {
            where: {
              subject_id: req.params.subject_id
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
    Subject.findAll({where: {subject_id: req.params.subject_id}})
    .then(subject => {
        if(subject.length <= 0) {
            return res.status(404).send('Subject not found');
        }
        Subject.destroy({
            where: {
                subject_id: req.params.subject_id
            }
        })
        .then(deletedSubject => {
            res.status(200).send('Subject deleted');
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))
};
