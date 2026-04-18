const mongoose = require('mongoose');

const studyMaterialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    materialType: {
        type: String,
        enum: ['notes', 'mindmap', 'video', 'article', 'pdfs', 'other'],
        // required: true
    },
    subject: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
});

const studyMaterialModel = mongoose.model("studyMaterial", studyMaterialSchema);

module.exports = studyMaterialModel;