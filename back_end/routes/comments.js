const router = require('express').Router();

const { createOneComment, readAllComments, readOneComment, updateOneComment, deleteOneComment } = require ('../controllers/comments');

/////////////////////////////////////////////
// CREATE ONE Comment
/////////////////////////////////////////////
router.post('/', createOneComment);

/////////////////////////////////////////////
// READ ALL Comments
/////////////////////////////////////////////
router.get('/', readAllComments);


/////////////////////////////////////////////
// READ ONE Comment
/////////////////////////////////////////////
router.get('/:comment_id', readOneComment);


/////////////////////////////////////////////
// UPDATE ONE Comment
/////////////////////////////////////////////
router.put('/:comment_id', updateOneComment);


/////////////////////////////////////////////
// DELETE ONE Comment
/////////////////////////////////////////////
router.delete('/:comment_id', deleteOneComment);




module.exports = router;