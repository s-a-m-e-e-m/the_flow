const { uploadFile } = require("../middleware/storage.services");
const studyMaterialModel = require("../models/studymaterial.model");
const studyPlanModel = require("../models/studyplan.model");
const { generateStudyPlan } = require("../services/ai2.services");

const createStudyPlanController = async (req, res) => {
    const { days, subjects } = req.body;

    if(!days || !subjects){
        return res.status(400).json({
            message: "days and subjects are required to generate a study plan."
        })
    }

    try {
        const filteredSubjects = subjects.join((", "));
        const studyPlan = await generateStudyPlan(days, filteredSubjects);

        const studyPlanRecord = await studyPlanModel.create({
            user: req.user.id,
            title: `Study plan for ${filteredSubjects} in ${days} days`,
            description: `A study plan to cover ${filteredSubjects} in ${days} days. This plan is designed to help you effectively manage your time and resources to achieve your learning goals. The plan includes a structured schedule, recommended study materials, and tips for staying motivated and focused throughout your learning journey. By following this study plan, you can maximize your learning potential and successfully master the subjects within the specified timeframe. Remember to adjust the plan as needed based on your progress and any unforeseen circumstances. Stay consistent, stay motivated, and good luck with your studies!`,
            plan: studyPlan
        });
        
        res.status(200).json({
            message: "Study plan generated successfully.",
            studyPlan: studyPlanRecord
        })
    } catch (error) {
        console.error("Error generating study plan:", error);
        return res.status(500).json({
            message: "An error occurred while generating the study plan."
        })
    }
}

const getStudyPlanController = async (req, res) => {
    const { planId } = req.params;
    if(!planId){
        return res.status(400).json({
            message: "plan's ID is required"
        })
    }

    const user = req.user;
    const studyPlan = await studyPlanModel.findOne({ _id: planId, user: user.id }).lean().select("-__v");

    if(!studyPlan){
        return res.status(404).json({
            message: "Study plan not found."
        })
    }

    return res.status(200).json({
        message: "Study plan fetched successfully.",
        studyPlan: studyPlan
    })
}

const getAllStudyPlansController = async (req, res) => {
    const user = req.user;
    if(!user){
        return res.status(401).json({
            message: "Unauthorized. Please log in to view your study plans."
        })
    }
    const studyPlans = await studyPlanModel.find({ user: user.id }).lean().select("-__v -plan -description");
    if(!studyPlans || studyPlans.length==0){
        return res.status(404).json({
            message: "No study plans so far. Create a study plan to see it here."
        })
    }

    return res.status(200).json({
        message: "All study plans fetched successfully.",
        studyPlans: studyPlans
    });
}

const uploadMaterialController = async (req, res) => {
    const file = req.file;

    if(!file){
        return res.status(400).json({
            message: "No file uploaded."
        })
    }

    const result = await uploadFile(file.buffer);

    const studyMaterialRecord = await studyMaterialModel.create({
        user: req.user.id,
        title: req.body.title,
        material: result.url,
        materialType: req.body.materialType,
        subject: req.body.subject
    })

    res.status(201).json({
        message: "Study material uploaded successfully.",
        studyMaterial: studyMaterialRecord
    })

}

module.exports = { createStudyPlanController, getStudyPlanController, uploadMaterialController, getAllStudyPlansController };