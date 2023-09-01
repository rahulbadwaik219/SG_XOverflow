const mongoose = require('mongoose');
const questionTagEnum = require('../utils/QuestionTagEnum');

const questionSchema = new mongoose.Schema({
    questioner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title : {
        type: String,
        required: true,
        maxlength: 25
    },
    questionBody: {
        type: String,
        required: true
    },
    questionTag: {
        type: String,
        enum : Object.keys(questionTagEnum)
    },
    questionViews: {
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

questionSchema.statics.getQuestion = async function (questionId) {
    const question = await Question.findById(questionId).populate('questioner', 'username');
    if(question)
    {
        return question;
    }
    else{
        throw Error('No question found');
    }
}

questionSchema.statics.getQuestionOfUser = async function(userId) {
    const question = await Question.find({questioner: userId}).sort("-createdAt").lean();
    if(question){
        return question;
    }
    else {
        throw Error('No Questions found for the user');
    }
}

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;