'use strict'
const { Post, Subject, User, Comment } = require('../models');
const fs = require('fs');

exports.createOnePost = (req, res, next) => {
    console.log(req.file);
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
