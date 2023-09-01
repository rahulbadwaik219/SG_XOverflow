const mongoose = require('mongoose');
const activityEnum = require('./utils/ActivityEnum');

const activitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    answer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answer"
    },
    activityType: {
        type: String,
        enum: mongoose.keys(activityEnum),
        required: true
    }
},
{
    timestamp: true
});

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;