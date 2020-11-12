'use strict'
const router = require('express').Router();
const auth = require('../middlewares/auth');

const { createOneSubject, readAllSubjects, readOneSubject, updateOneSubject, deleteOneSubject } = require ('../controllers/subjects');

/////////////////////////////////////////////
// CREATE ONE Subject
/////////////////////////////////////////////
router.post('/', auth, createOneSubject);

/////////////////////////////////////////////
// READ ALL Subjects
/////////////////////////////////////////////
router.get('/', auth, readAllSubjects);


/////////////////////////////////////////////
// READ ONE Subject
/////////////////////////////////////////////
router.get('/:id', auth, readOneSubject);


/////////////////////////////////////////////
// UPDATE ONE Subject
/////////////////////////////////////////////
router.put('/:id', auth, updateOneSubject);


/////////////////////////////////////////////
// DELETE ONE Subject
/////////////////////////////////////////////
router.delete('/:id', auth, deleteOneSubject);




module.exports = router;