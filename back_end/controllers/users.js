const User = require('../models/User');
const db =  require('../config/database');

exports.signup = (req, res, next) => {
    const userObject = {
        ...req.body
    }
    User.create(userObject)
    .then(createdUser => {
        res.status(201).send('User created');
    })
    .catch(error => {
        res.status(500).json({error});
    })
};


exports.login = (req, res, next) => {
    // Login with jwt
};


exports.readOneUser = (req, res, next) => {
    User.findAll({where: {id: req.params.id}})
    .then(user => {
        if(user.length <= 0) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    })
    .catch(error => res.status(500).json({error}))
};


exports.updateOneUser = (req, res, next) => {
    User.findAll({where: {id: req.params.id}})
    .then(user => {
        if(user.length <= 0) {
            return res.status(404).send('User not found');
        }
        User.update({ ...req.body }, {
            where: {
              id: req.params.id
            }
        })
        .then(updatedUser => {
            res.status(200).send('User updated');
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))
};


exports.deleteOneUser = (req, res, next) => {
    User.findAll({where: {id: req.params.id}})
    .then(user => {
        if(user.length <= 0) {
            return res.status(404).send('User not found');
        }
        User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(deletedUser => {
            res.status(200).send('User deleted');
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))
};