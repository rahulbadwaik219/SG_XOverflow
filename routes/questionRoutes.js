const {Router} = require('express');
const questionController = require('../controllers/questionController');
const {getUser} = require('../middleware/authMiddleware');

const router = Router();

//routes starting with /question
router.get('/', getUser, questionController.getQuestions);
router.get('/me', getUser, questionController.getQuestionsOfCurrentUser);
router.post('/',getUser, questionController.postQuestion);

router.get('/:qid', questionController.getQuestionById);
router.put('/:qid', getUser, questionController.updateQuestionById);
router.get('/:qid/answers', questionController.getAnswersByQuestion);
router.post('/:qid/answers', getUser, questionController.postAnswer);

module.exports = router;