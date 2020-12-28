'use strict'
const { User, Post, Comment, Report, Subject } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { Op } = require('sequelize');
const fsPromise = fs.promises;

exports.signup = (req, res, next) => {
    const passRegexp = new RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/);
    if(passRegexp.test(req.body.password) == false) {
        return res.status(401).send('Please enter a strong password');
    }
    bcrypt.hash(req.body.password, 10)
    .then(hashPass => {
        const userObject = req.file ? {
            ...req.body,
            password: hashPass,
            image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

        } : {
            ...req.body,
            password: hashPass
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
    const userObject = req.file ? {
        ...req.body,
        image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };
    User.findOne({where: {id: req.params.id}})
    .then(user => {
        if(!user) {
            return res.status(404).send('User not found');
        }
        if (req.file && user.image_url !== null) {
            const filename = user.image_url.split('/images/')[1];
            fs.unlink(`images/${filename}`, (err) => {
                if (err) { console.log(err);}
            });
        }
        User.update( userObject , {
            where: {
              id: req.params.id
            }
        })
        .then(updatedUser => {
            res.status(200).send('User updated');
        })
        .catch(error => res.status(500).json({two: error}))
    })
    .catch(error => res.status(500).json({one: error}))
};




exports.deleteOneUser = (req, res, next) => {
    User.findOne({where: {id: req.params.id}})
    .then(user => {
        if(!user) {
            return res.status(404).send('User not found');
        }
        const filename = user.image_url.split('/images/')[1];
        Post.update({user_id: 1}, {where: {user_id: req.params.id}})
        .then(() => {
            Comment.update({user_id: 1}, {where: {user_id: req.params.id}})
            .then(() => {
                fs.unlink(`images/${filename}`, err => {if(err) console.log(err)});
                User.destroy({where: {id: req.params.id}})
                .then(() => res.status(200).send('User deleted'))
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
