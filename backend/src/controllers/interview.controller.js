const pdfParse = require('pdf-parse');

const { generateInterviewReport, generateResumePdf } = require('../services/ai.services');
const interviewReportModel = require('../models/interviewreport.model');
// const { generateCareerRoadmap } = require('../services/ai3.services');
const roadMapModel = require('../models/roadmap.model');

const generateInterviewReportController = async (req, res) => {
    if (!req.file || !req.file.buffer) {
        return res.status(400).json({
            message: 'Resume file is required. Please upload a PDF file in the resume field.'
        });
    }

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const { selfDescription, jobDescription } = req.body;

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    });

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    });

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    })
} 

const getInterviewReportByIdController = async (req, res) => {
    const { reportId } = req.params;
    const interviewReport = await interviewReportModel.findOne({ _id: reportId, user: req.user.id });

    if(!interviewReport){
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}

const getAllInterviewReportsOfUser = async (req, res) => {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -updatedAt -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully",
        interviewReports
    })
}

const generateResumePdfController = async (req, res) => {
    const { interviewReportId } = req.params;

    const interviewReport = await interviewReportModel.findById(interviewReportId);

    if(!interviewReport){
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription });

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    });

    res.send(pdfBuffer)
}

const fetchAllRoadmapsController = async (req, res) => {
    const roadmaps = await roadMapModel.find({});

    return res.status(200).json({
        message: "Roadmaps fetched successfully.",
        roadmaps
    })
}

module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsOfUser, generateResumePdfController, fetchAllRoadmapsController };