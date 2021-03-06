'use strict'
const { User, Post, Comment, Report, Subject, Like } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { Op } = require('sequelize');
const fsPromise = fs.promises;
const s3 = require('../config/aws-config');

const passwordRegex = new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/);

exports.signup = (req, res, next) => {
    if(passwordRegex.test(req.body.password) == false) {
        return res.status(401).send('Please enter a strong password');
    }
    bcrypt.hash(req.body.password, 10)
    .then(hashPass => {
        const userObject = {
            ...req.body,
            password: hashPass,
            image_url: req.file ? req.file.location : `${req.protocol}://${req.get('host')}/images/public/anonyme_avatar.png`,

        };
        User.create(userObject)
        .then(createdUser => {
            res.status(201).send(createdUser);
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
            return res.status(404).json({message: 'User not found'})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(validPass => {
            if(!validPass){
                return res.status(400).send({message: 'Wrong password'})
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
    User.findOne({
        include: [
            {
                model: Subject
            }
        ],
        where: {id: req.params.id}
    })
    .then(user => {
        if(user.length <= 0) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(user);
    })
    .catch(error => res.status(500).json({error}))
};


exports.updateOneUser = (req, res, next) => {
    if (req.body.password) {
        return res.status(400).send('The password cannot be updated in this route');
    };
    
    let userObject = req.file ? {
        ...req.body,
        image_url: req.file.location
    } : {
        ...req.body
    };
    // First, check if the user exist
    User.findOne({where: {id: req.params.id}})
    .then(user => {
        // if not, respond with a 404 code
        if(!user) {
            return res.status(404).send('User not found');
        }
        // if the user gives an image, then remove the old one from the server
        if (req.file && user.image_url !== null) {
            s3.deleteObject({
                Bucket: 'groupomania',
                Key: user.image_url.split('https://groupomania.s3.eu-west-3.amazonaws.com/')[1]
            }, (err) => {
                if (err) {
                    console.log(err, err.stack);
                }
            });
        }
        // Then update the user in the db
        User.update( userObject , {
            where: {
              id: req.params.id
            }
        })
        .then(updatedUser => {
            // Finally, look for the new line in the db then respond with that data
            User.findOne({
                include: [
                    {
                        model: Subject
                    }
                ],
                where: {id: req.params.id}
            })
            .then(user => {
                if(user.length <= 0) {
                    return res.status(404).send('User not found');
                }
                res.status(200).json(user);
            })
            .catch(error => res.status(500).json({error}))
        })
        .catch(error => res.status(500).json({two: error}))
    })
    .catch(error => res.status(500).json({one: error}))
};

exports.updatePassword = (req, res) => {
    if(passwordRegex.test(req.body.newPassword) === false) {
        return res.status(400).send('Please enter a strong password');
    }
    // First, check if the user exist in the db
    User.findOne({where: {id: req.params.id}})
    .then(user => {
        // if not, respond with a 404 code
        if(!user) {
            return res.status(404).send('User not found');
        }
        // Then, check if the old password is valid
        bcrypt.compare(req.body.oldPassword, user.password)
        .then(validPass => {
            if(!validPass){
                return res.status(400).send('Wrong password');
            }
            // Then, hash the new Password
            bcrypt.hash(req.body.newPassword, 10)
            .then((newPasswordHashed) => {
                // Finally update the password with the new one
                User.update({password: newPasswordHashed}, {
                    where: {
                        id: req.params.id,
                    }
                })
                .then((response) => res.status(200).json(response))
                .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};



exports.deleteOneUser = (req, res, next) => {
    User.findOne({where: {id: req.params.id}})
    .then(user => {
        if(!user) {
            return res.status(404).send('User not found');
        }
        Post.update({user_id: 1}, {where: {user_id: req.params.id}})
        .then(() => {
            Comment.update({user_id: 1}, {where: {user_id: req.params.id}})
            .then(() => {
                Like.destroy({where: {UserId: req.params.id}})
                .then(() => {
                    s3.deleteObject({
                        Bucket: 'groupomania',
                        Key: user.image_url.split('https://groupomania.s3.eu-west-3.amazonaws.com/')[1]
                    }, (err, data) => {
                        if (err) {
                            console.log(err, err.stack);
                        } else {
                            console.log(data);
                        }
                    });
                    User.destroy({where: {id: req.params.id}})
                    .then(() => res.status(200).send('User deleted'))
                    .catch(error => res.status(500).json({error}))
                })
                .catch(error => res.status(500).json({error}))
            })
            .catch(error => res.status(500).json({error}))
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

exports.report = (req, res, next) => {
    Report.findOne({where: {
        [Op.or]: [
            {item_id: req.body.item_id},
            {item_type: req.body.item_type}
        ]
    }})
    .then((report) => {
        if(report) {
            return res.status(200).send('A report has already been send for this problem')
        }
        Report.create({ ...req.body , status: 'pending'})
        .then(() => res.status(202).send('The report has been created, we are going to look through it as soon as possible.'))
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))
};
