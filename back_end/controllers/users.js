const { User, Comment, Post } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs =require('fs');
const fsPromise = fs.promises;

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hashPass => {
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
    User.findOne({where: {email: req.body.email}})
    .then(user => {
        if(!user){
            return res.status(404).send('User not found')
        }
        bcrypt.compare(req.body.password, user.password)
        .then(validPass => {
            if(!validPass){
                return res.status(401).send('Wrong password')
            }
            res.status(200).json({
                userId: user.id,
                token: jwt.sign({userId: user.id}, process.env.TOKEN_SECRET, {expiresIn: '12h'})
            })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
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


exports.exportUser = (req, res, next) => {
    const userDatas = [];
    const dataFile = `./userDatas/${req.params.id}`
    User.findOne({where: {id: req.params.id}})
    .then(user => {
        if(!user) {
            return res.status(404).send('User not found');
        }
        userDatas.push(JSON.stringify(user.dataValues));
        Post.findAll({where: {user_id: user.id}})
        .then(posts => {
            if(!posts) {
                userDatas.push('You don\'t have any posts');
            } else {
                posts.forEach(post => {
                    userDatas.push(JSON.stringify(post.dataValues))
                })
            }
            Comment.findAll({where: {user_id: user.id}})
            .then(comments => {
                if(!comments) {
                    userDatas.push('You do not have any comments');
                } else {
                    comments.forEach(comment => {
                        userDatas.push(JSON.stringify(comment.dataValues))
                    })
                }
                fsPromise.writeFile(dataFile, userDatas)
                .then(() => {
                    res.status(201).download(dataFile, 'Vos_données_personnelles.txt', err => {
                        if(err) {
                            return res.status(500).json({err});
                        }
                        fsPromise.unlink(dataFile, err => {
                            if(err) {
                                return res.status(500).json({err});
                            }
                        })
                    })
                })
                .catch(error => {res.status(500).json({error})});
            })
            .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};