'use strict'
const router = require('express').Router();
const auth = require('../middlewares/auth');

const { followSubject, readAllFollowsByUser, unFollowSubject } = require('../controllers/subjectFollow');

/////////////////////////////////////////////
// Create a follow
/////////////////////////////////////////////
router.post('/:user_id',auth, followSubject);


/////////////////////////////////////////////
// Read all follows for one user
/////////////////////////////////////////////
router.get('/:user_id',auth, readAllFollowsByUser);


/////////////////////////////////////////////
// Delete one follow = unfollow
/////////////////////////////////////////////
router.post('/unfollow/:user_id',auth, unFollowSubject)

module.exports = router;