'use strict'
const { Post, Subject, User, Comment } = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: posts } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, posts, totalPages, currentPage };
};

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
        Post.findOne({
            include: [
                {model: Subject},
                {model: User},
                {model: Comment, include: { model: User }}
            ], where: {id: createdPost.id}})
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => res.status(500).json({error}))
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
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    User.findOne({where: {id: req.params.user_id} ,include: Subject})
    .then(user => {
        const followsId = [];
        user.Subjects.forEach(subject => {
            followsId.push(subject.dataValues.id);
        })
        Post.findAndCountAll({
            include: [
                {model: Subject},
                {model: User},
                {model: Comment, include: { model: User }}
            ],
            limit,
            offset,
            where: {
                [Op.or]: [
                    {user_id : req.params.user_id},
                    {subject_id : followsId}
                ]
            },
            order: [ ['createdAt', 'DESC'] ]
        })
        .then((posts) => {
            if(posts.length <= 0) {
                return res.status(404).json({message: 'Posts not found'});
            }
            const response = getPagingData(posts, page, limit);
            res.status(200).json(response);
        })
        .catch(error => {
            res.status(500).json({error});
        })
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
