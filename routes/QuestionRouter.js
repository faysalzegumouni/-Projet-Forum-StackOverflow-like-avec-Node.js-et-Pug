const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/questionController');

router.post('/new-question', QuestionController.createQuestion);
router.get('/home1', QuestionController.getQuestions);
module.exports = router;