const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    stages: {
        type: Array,
        required: true
    }
});

const roadMapModel = mongoose.model("roadmap", roadmapSchema);

module.exports = roadMapModel