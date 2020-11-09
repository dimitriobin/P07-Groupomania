const router = require('express').Router();
const { signup, login, readAllUser, readOneUser, updateOneUser, deleteOneUser } = require ('../controllers/users');
const auth = require('../middlewares/auth');

/////////////////////////////////////////////
// CREATE ONE User
/////////////////////////////////////////////
router.post('/signup', signup);

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
router.put('/:id', auth, updateOneUser);


/////////////////////////////////////////////
// DELETE ONE User
/////////////////////////////////////////////
router.delete('/:id', auth, deleteOneUser);

module.exports = router;