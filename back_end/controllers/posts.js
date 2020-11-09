const { Post } = require('../models');

exports.createOnePost = (req, res, next) => {
    const postObject = {
        ...req.body,
        user_id: req.body.user_id,
        subject_id: req.body.subject_id
    }
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
    Post.findAll({where: {id: req.params.id}})
    .then(post => {
        if(post.length <= 0) {
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
    Post.findAll({where: {id: req.params.id}})
    .then(post => {
        if(post.length <= 0) {
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
