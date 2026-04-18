const mongoose = require('mongoose');

const studyPlanSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [ true, "Title is required" ]
    },
    description: {
        type: String
    },
    plan: {
        type: Array,
        required: [ true, "Roadmap is required" ]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
});

const studyPlanModel = mongoose.model("studyPlan", studyPlanSchema);

module.exports = studyPlanModel;