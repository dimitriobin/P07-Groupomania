'use strict'
const router = require('express').Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const { 
  createOnePost,
  readAllPosts,
  readAllPostsByUser,
  readAllPostsBySubject,
  readOnePost,
  updateOnePost,
  deleteOnePost,
  readAllPostsByFollow,
  likePost,
  readAllLikesByUser,
  unlikePost
} = require ('../controllers/posts');

/////////////////////////////////////////////
// CREATE ONE Post
/////////////////////////////////////////////
router.post('/', auth, multer, createOnePost);

/////////////////////////////////////////////
// READ ALL Posts
/////////////////////////////////////////////
router.get('/', auth, readAllPosts);


/////////////////////////////////////////////
// READ ALL Followed Posts
/////////////////////////////////////////////
router.get('/:user_id', auth, readAllPostsByFollow);

/////////////////////////////////////////////
// READ ALL Posts by user
/////////////////////////////////////////////
router.get('/user/:user_id', auth, readAllPostsByUser);

/////////////////////////////////////////////
// READ ALL Posts by subject
/////////////////////////////////////////////
router.get('/subject/:subject_id', auth, readAllPostsBySubject);


/////////////////////////////////////////////
// READ ONE Post by id 
/////////////////////////////////////////////
router.get('/:id', auth, readOnePost);


/////////////////////////////////////////////
// UPDATE ONE Post
/////////////////////////////////////////////
router.put('/:id', auth, multer, updateOnePost);


/////////////////////////////////////////////
// DELETE ONE Post
/////////////////////////////////////////////
router.delete('/:id', auth, deleteOnePost);


/////////////////////////////////////////////
// Create a like
/////////////////////////////////////////////
router.post('/:id/like', auth, likePost);


/////////////////////////////////////////////
// Read all likes for one user
/////////////////////////////////////////////
router.post('/like', auth, readAllLikesByUser);


/////////////////////////////////////////////
// Delete one like = unlike
/////////////////////////////////////////////
router.delete('/:id/unlike', auth, unlikePost)




module.exports = router;