const {Router} = require('express');
const answerController = require('../controllers/answerController');
const {getUser} = require('../middleware/authMiddleware');

const router = Router();

//routes starting with /answer
router.get('/me', getUser, answerController.getAnswersOfCurrentUser);
router.get('/:aid', answerController.getAnswersById);
router.put('/:aid', getUser, answerController.updateAnswerById);
router.put('/:aid/accept', getUser, answerController.acceptAnswer);

module.exports = router;