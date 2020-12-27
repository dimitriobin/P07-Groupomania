'use strict'
const { Post, Subject, User, Comment, Like, sequelize } = require('../models');
const { Op } = require('sequelize');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const getPagination = (page, size) => {
    const limit = size ? +size : 1;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: posts } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, posts, totalPages, currentPage };
};

const getUserId = (bearerToken) => {
    const token = bearerToken.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    if (userId) {
        return userId;
    }
} 

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
                {model: Comment, include: { model: User }},
                {model: Like, include: {
                    model: User, attributes: ['user_name']
                }}
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


exports.fetchAllPostsByKeyword = (req, res, next) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const keyword = req.query.keyword;
  
    Post.findAndCountAll({
        include: [
            {model: Subject},
            {model: User},
            {model: Comment, attributes: ['id']},
            {
                model: Like, 
                include: { model: User, attributes: ['user_name'] },
            }
        ],
        limit,
        offset,
        where: { title: { [Op.like]: `%${keyword}%`} },
        order: [ ['createdAt', 'DESC'] ]
    })
    .then((posts) => {
        console.log('here');
        if(posts.length <= 0) {
            return res.status(404).json({message: 'Posts not found'});
        }
        const response = getPagingData(posts, page, limit);
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({error});
    })
  };


exports.readAllPostsByFollow = (req, res, next) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    let sorting = [];
    switch (req.query.order) {
        case 'new':
            sorting = [`createdAt`, 'DESC'];
            break;

        case 'top':
            sorting = [[sequelize.literal(`(SELECT COUNT(*) FROM groupomania.like WHERE post.id = like.PostId)`), 'DESC']]
            break;
        
        case 'hot':
            sorting = [[sequelize.literal(`(SELECT COUNT(*) FROM groupomania.comment WHERE post.id = comment.post_id)`), 'DESC']]
            break;
    
        default:
            break;
    }

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
                {model: Comment, attributes: ['id']},
                {
                    model: Like, 
                    include: { model: User, attributes: ['user_name'] },
                }
            ],
            distinct: true,
            limit,
            offset,
            where: {
                [Op.or]: [
                    {user_id : req.params.user_id},
                    {subject_id : followsId}
                ]
            },
            order: [ [...sorting] ]
        })
        .then((posts) => {
            if(posts.length <= 0) {
                return res.status(404).json({message: 'Posts not found'});
            }
            console.log(posts);
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
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    Post.findAndCountAll({
        include: [
            {model: Subject},
            {model: User},
            {model: Comment, include: { model: User }},
            {model: Like, include: {
                model: User, attributes: ['user_name']
            }}
        ],
        limit,
        offset,
        where: {user_id: req.params.user_id},
        order: [ ['createdAt', 'DESC'] ]
    })
    .then(posts => {
        if(posts.length <= 0) {
            return res.status(404).send('Posts not found');
        }
        const response = getPagingData(posts, page, limit);
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({error});
    });
};


exports.readAllPostsBySubject = (req, res, next) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    Post.findAndCountAll({
        include: [
            {model: Subject},
            {model: User},
            {model: Comment, include: { model: User }},
            {model: Like, include: {
                model: User, attributes: ['user_name']
            }}
        ],
        distinct: true,
        limit,
        offset,
        where: {
            subject_id: {
                [Op.eq]: req.params.subject_id
            }
        },
        order: [ ['createdAt', 'DESC'] ]
    })
    .then(posts => {
        if(posts.length <= 0) {
            return res.status(404).send('Posts not found');
        }
        const response = getPagingData(posts, page, limit);
        res.status(200).json(response);
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
            Post.findOne({
                include: [
                    {model: Subject},
                    {model: User},
                    {model: Comment, include: { model: User }},
                    {model: Like, include: {
                        model: User, attributes: ['user_name']
                    }}
                ], where: {id: req.params.id}})
            .then(post => {
                res.status(201).json(post);
            })
            .catch(error => res.status(500).json({error}))
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
        if (post.image_url) {
            const filename = post.image_url.split('/images/')[1];
            fs.unlink(`images/${filename}`, err => {if(err) console.log(err)});
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


// Permit a user to like a Post
exports.likePost = (req, res, next) => {
    Like.create({
        UserId: getUserId(req.headers.authorization),
        PostId: req.params.id
    })
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => res.status(500).json({ error }))
};


exports.readAllLikesByUser = (req, res, next) => {
    User.findOne({where: {id: req.body.userId}, include: Subject})
    .then(user => {
        if(!user){
            return res.status(404).send('Subject not found')
        }
        res.status(200).json(user.Subjects)
    })
    .catch(error => res.status(500).json({ error }))
};


exports.unlikePost = (req, res, next) => {
    Like.destroy({
        where: {
            [Op.and]: [
                {UserId : getUserId(req.headers.authorization)},
                {PostId : req.params.id}
            ]
        }
    })
    .then(response => {
        res.status(200).json(response);
    })
    .catch(error => res.status(500).json({error}))
};

