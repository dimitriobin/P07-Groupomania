'use strict'
const { Comment, User } = require('../models');

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: comments } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, comments, totalPages, currentPage };
};

exports.createOneComment = (req, res, next) => {
    const commentObject = {
        ...req.body,
        user_id: req.body.user_id,
        subject_id: req.body.subject_id,
        post_id: req.body.post_id
    }
    Comment.create(commentObject)
    .then(createdComment => {
        Comment.findOne({
            include: [
                { model: User, attributes: ['user_name']}
            ],
            where: {
                id: createdComment.id
            }
        })
        .then(comment => res.status(201).json(comment))
        .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};


exports.readAllComments = (req, res, next) => {
    Comment.findAll()
    .then(comments => {
        if(comments.length <= 0) {
            return res.status(404).send('Comments not found');
        }
        res.status(200).json(comments);
    })
    .catch(error => {
        res.status(500).json({error});
    });
    
};


exports.readAllCommentsBySubject = (req, res, next) => {
    Comment.findAll({where: {subject_id: req.params.subject_id}})
    .then(comments => {
        if(comments.length <= 0) {
            return res.status(404).send('Comments not found');
        }
        res.status(200).json(comments);
    })
    .catch(error => {
        res.status(500).json({error});
    });
};



exports.readAllCommentsByUser = (req, res, next) => {
    Comment.findAll({where: {user_id: req.params.user_id}})
    .then(comments => {
        if(comments.length <= 0) {
            return res.status(404).send('Comments not found');
        }
        res.status(200).json(comments);
    })
    .catch(error => {
        res.status(500).json({error});
    });
};


exports.readAllCommentsByPost = (req, res, next) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    Comment.findAndCountAll({
        include: [
            {model: User, attributes: ['user_name']}
        ],
        limit,
        offset,
        where: {post_id: req.params.post_id},
        order: [ ['createdAt', 'DESC'] ]
    })
    .then(comments => {
        if(comments.length <= 0) {
            return res.status(404).send('Comments not found');
        }
        const response = getPagingData(comments, page, limit);
        res.status(200).json(response);
    })
    .catch(error => {
        res.status(500).json({error});
    });
};


exports.readOneComment = (req, res, next) => {
    Comment.findOne({where: {id: req.params.id}})
    .then(comment => {
        if(!comment) {
            return res.status(404).send('Comment not found');
        }
        res.status(200).json(comment);
    })
    .catch(error => res.status(500).json({error}))
};


exports.updateOneComment = (req, res, next) => {
    Comment.findOne({where: {id: req.params.id}})
    .then(comment => {
        if(!comment) {
            return res.status(404).send('Comment not found');
        }
        Comment.update({ ...req.body }, {
            where: {
              id: req.params.id
            },
        })
        .then(() => {
            Comment.findOne({
                include: [
                    { model: User, attributes: ['user_name']}
                ],
                where: {
                    id: req.params.id
                }
            })
            .then(comment => res.status(201).json(comment))
            .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))
};


exports.deleteOneComment = (req, res, next) => {
    Comment.findOne({where: {id: req.params.id}})
    .then(comment => {
        if(!comment) {
            return res.status(404).send('Comment not found');
        }
        Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(deletedComment => {
            res.status(200).send('Comment deleted');
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))
};
