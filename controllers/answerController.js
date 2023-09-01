const Question = require('../models/Question');
const Answer = require('../models/Answer');

module.exports.getAnswersOfCurrentUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const answers = await Answer.getAnswersOfUser(userId);
        res.status(210).json({answers});
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
}

module.exports.getAnswersById= async (req, res) => {
    try {
        const answerId = req.params.aid;
        const answer = await Answer.findById(answerId).populate('question').populate('answerer', 'username');
        if(!answer) {
            res.status(400).json("No answer found");
        }
        res.status(210).json({answer});
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
}

module.exports.updateAnswerById = async (req, res) => {
    try {
        const userId = req.user.id;
        const answerId = req.params.aid;
        const {answerBody} = req.body;
        let answer = await Answer.findById(answerId);
        if(!answer) {
            return res.status(400).json("No answer found");
        }
        if(answer.answerer != userId) {
            return res.status(400).json({ msg: "Invalid Answer id.." });
        }
        answer = await Answer.findByIdAndUpdate(answerId, {answerBody}, {new: true});
        res.status(201).json({answer});
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
}

module.exports.acceptAnswer = async (req, res) => {
    try {
        const userId = req.user.id;
        const answerId = req.params.aid;
        let answer = await Answer.findById(answerId).populate('question');
        if(!answer) {
            return res.status(400).json("No answer found");
        }
        if(answer.question.questioner == userId) {
            return res.status(400).json({ msg: "Not allowed" });
        }
        answer = await Answer.findByIdAndUpdate(answerId, {isAccepted: true}, {new: true});
        res.status(201).json({answer});
    } catch (error) {
        console.log(error);
        res.status(400).json({error});
    }
}