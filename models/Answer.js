const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    answerer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Question"
    },
    answerBody: {
        type: String,
        required: true
    },
    isAccepted: {
        type: Boolean,
        default: false
    },
    upvotes: {
        type: Number,
        required: true,
        default: 0
    }
},
{
    timestamps: true
});

answerSchema.statics.getAnswers = async function(questionId) {
    const answers = await Answer.find({question: questionId}).populate('answerer','username');
    if(answers) {
        return answers;
    }
    else {
        throw Error('No answers found fot this question');
    }
}

answerSchema.statics.getAnswersOfUser = async function(userId) {
    const answers = await Answer.find({answerer: userId}).populate("question").sort("-createdAt");
    if(answers){
        return answers;
    }
    else {
        throw Error('No Answers found for the user');
    }
} 

const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;