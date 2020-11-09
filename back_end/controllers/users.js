const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hashPass => {
        console.log(hashPass);
        const userObject = {
            user_name: req.body.user_name,
            email: req.body.email,
            password: hashPass,
            image_url: req.body.image_url
        }
        User.create(userObject)
        .then(createdUser => {
            res.status(201).send('User created');
        })
        .catch(error => {
            res.status(500).json({error});
        })
    })
    .catch(error => res.status(500).json({error}));
};


exports.login = (req, res, next) => {
    
};

exports.readAllUser = (req, res, next) => {
    User.findAll()
    .then(users => {
        if(users.length <= 0) {
            return res.status(404).send('Users not found');
        }
        res.status(200).json(users);
    })
    .catch(error => res.status(500).json({error}))
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