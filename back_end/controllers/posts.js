'use strict'
const { Post } = require('../models');
const fs = require('fs');

exports.createOnePost = (req, res, next) => {
    const postObject = req.file ? {
        title: req.body.title,
        description: req.body.description,
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
        res.status(201).send('Post created');
    })
    .catch(error => {
        res.status(500).json({error});
    })
};


exports.readAllPosts = (req, res, next) => {
    Post.findAll()
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
    Post.findAll({where: {user_id: req.params.user_id}})
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
    Post.findAll({where: {subject_id: req.params.subject_id}})
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
    Post.findOne({where: {id: req.params.id}})
    .then(post => {
        if(!post) {
            return res.status(404).send('Post not found');
        }
        Post.update({ ...req.body }, {
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
