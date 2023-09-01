const Question = require('../models/Question');
const Answer = require('../models/Answer');
const {checkUser} = require('../middleware/authMiddleware');

module.exports.getQuestions = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports.getQuestionsOfCurrentUser = async (req, res) => {
    try {
        const userId = req.user.id;
        let questions = await Question.getQuestionOfUser(userId);
        const extraInfo = async (question) => {
            const answerCount = await Answer.countDocuments({question: question._id});
            return {question, answerCount};
        }
        questions = await Promise.all(questions.map(question => extraInfo(question)));
        res.status(201).json({questions});
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
}

module.exports.postQuestion = async (req, res) => {
    const {title, questionBody, questionTag} = req.body;
    try {
        const userId = req.user.id;
        const question = await Question.create({questioner: userId, title, questionBody, questionTag});
        res.status(201).json({question});
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
}

module.exports.getQuestionById = async (req, res) => {
    try {
        const questionId = req.params.qid;
        const question = await Question.getQuestion(questionId);
        res.status(201).json({question});
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
}

module.exports.updateQuestionById = async (req, res) => {
    try {
        const questionId = req.params.qid;
        const userId = req.user.id;
        const {title, questionBody} = req.body;
        let question = await Question.getQuestion(questionId);
        //console.log({question, userId});
        if(question.questioner.id != userId) {
            res.status(400).json("Can not edit question written by others");
        }
        question = await Question.findByIdAndUpdate(questionId, {title, questionBody}, {new: true});
        res.status(201).json({question});
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
}

module.exports.getAnswersByQuestion = async (req, res) => {
    try {
        const questionId = req.params.qid;
        await Question.getQuestion(questionId);
        const answers = await Answer.getAnswers(questionId);
        res.status(201).json({answers});
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
}

module.exports.postAnswer = async (req, res) => {
    try {
        const userId = req.user.id;
        const questionId = req.params.qid;
        const {answerBody} = req.body;

        await Question.getQuestion(questionId);
        const answer = await Answer.create({answerer: userId, question: questionId, answerBody});
        res.status(201).json({answer});
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
}
