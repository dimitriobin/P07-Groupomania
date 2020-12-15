'use strict'
const { Post, Subject, User, Comment, sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const fs = require('fs');

exports.createOnePost = (req, res, next) => {
    const postObject = req.file ? {
        title: req.body.title,
        image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        user_id: req.body.user_id,
        subject_id: req.body.subject_id
    } : {
        ...req.body,
        user_id: req.body.user_id,
        subject_id: req.body.subject_id
    };
    Post.create(postObject)
    .then(createdPost => {
        res.status(201).json(createdPost);
    })
    .catch(error => {
        res.status(500).json({error});
    })
};


exports.readAllPosts = (req, res, next) => {
    Post.findAll({include: [
        {model: Subject},
        {model: User},
        {model: Comment, include: { model: User }}
    ]})
    .then(posts => {
        if(posts.length <= 0) {
            return res.status(404).send('Posts not found');
        }
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({error});
    });
};


exports.readAllPostsByFollow = (req, res, next) => {
    sequelize.query(
        `
        SELECT
            post.*,
            user.user_name AS 'User.user_name',
            user.image_url AS 'User.image_url',
            user.id AS 'User.id',
            subject.id AS 'Subject.id',
            subject.name AS 'Subject.name'
        FROM groupomania.post AS post
        JOIN groupomania.user AS user
            ON post.user_id = user.id
        JOIN groupomania.subject AS subject
            ON post.subject_id = subject.id
        WHERE post.subject_id IN ( SELECT follow.SubjectId FROM groupomania.subjectfollows AS follow WHERE UserId = :user)
            OR post.user_id = :user
        ORDER BY post.createdAt ASC;
    `
    , {
        replacements: {
            user: `${req.params.user_id}`
        },
        nest: true,
        type: QueryTypes.SELECT })
    .then((posts) => {
        if(posts.length <= 0) {
            return res.status(404).send('Posts not found');
        }
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({error});
    });
};


exports.readAllPostsByUser = (req, res, next) => {
    Post.findAll({include: [
            {model: Subject},
            {model: User},
            {model: Comment, include: { model: User }}
        ], where: {user_id: req.params.user_id}})
    .then(posts => {
        if(posts.length <= 0) {
            return res.status(404).send('Posts not found');
        }
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({error});
    });
};


exports.readAllPostsBySubject = (req, res, next) => {
    Post.findAll({include: [
        {model: Subject},
        {model: User},
        {model: Comment, include: { model: User }}
    ], where: {subject_id: req.params.subject_id}})
    .then(posts => {
        if(posts.length <= 0) {
            return res.status(404).send('Posts not found');
        }
        res.status(200).json(posts);
    })
    .catch(error => {
        res.status(500).json({error});
    });
};


exports.readOnePost = (req, res, next) => {
    Post.findOne({where: {id: req.params.id}})
    .then(post => {
        if(!post) {
            return res.status(404).send('Post not found');
        }
        res.status(200).json(post);
    })
    .catch(error => res.status(500).json({error}))
};


exports.updateOnePost = (req, res, next) => {
    const postObject = req.file ? {
        ...req.body,
        image_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    };
    Post.findOne({where: {id: req.params.id}})
    .then(post => {
        if(!post) {
            return res.status(404).send('Post not found');
        }
        if (req.file && post.image_url !== null) {
            const filename = post.image_url.split('/images/')[1];
            fs.unlink(`images/${filename}`, (err) => {
                if (err) { console.log(err);}
            });
        }
        Post.update(postObject, {
            where: {
              id: req.params.id
            }
        })
        .then(updatedPost => {
            res.status(200).send('Post updated');
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))
};


exports.deleteOnePost = (req, res, next) => {
    Post.findOne({where: {id: req.params.id}})
    .then(post => {
        if(!post) {
            return res.status(404).send('Post not found');
        }
        const filename = post.image_url.split('/images/')[1];
        fs.unlink(`images/${filename}`, err => {if(err) console.log(err)});
        Post.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(deletedPost => {
            res.status(200).send('Post deleted');
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))
};
