const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    type: {
        type: String,
        required: true,
        enum: ["question","answer"]
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    answer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer"
    }
},
{
    timestamp: true
});

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;