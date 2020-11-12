'use strict'
const router = require('express').Router();
const { signup, login, readAllUser, readOneUser, updateOneUser, deleteOneUser, exportUser, report } = require ('../controllers/users');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

/////////////////////////////////////////////
// CREATE ONE User
/////////////////////////////////////////////
router.post('/signup', multer, signup);

/////////////////////////////////////////////
// LOGIN ONE User
/////////////////////////////////////////////
router.post('/login', login);

/////////////////////////////////////////////
// READ ALL Users
/////////////////////////////////////////////
router.get('/', auth, readAllUser);


/////////////////////////////////////////////
// READ ONE User
/////////////////////////////////////////////
router.get('/:id', auth, readOneUser);


/////////////////////////////////////////////
// UPDATE ONE User
/////////////////////////////////////////////
router.put('/:id', auth, multer, updateOneUser);


/////////////////////////////////////////////
// DELETE ONE User
/////////////////////////////////////////////
router.delete('/:id',  deleteOneUser);


/////////////////////////////////////////////
// EXPORT ONE User
/////////////////////////////////////////////
router.get('/export/:id', exportUser);

/////////////////////////////////////////////
// CREATE a Report
/////////////////////////////////////////////
router.post('/report', report);

module.exports = router;