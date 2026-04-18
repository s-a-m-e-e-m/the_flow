const express = require('express');

const interviewRouter = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../middleware/file.middleware');
const { generateInterviewReportController, generateResumePdfController, getAllInterviewReportsOfUser, getInterviewReportByIdController, fetchAllRoadmapsController } = require('../controllers/interview.controller');

interviewRouter.post("/report", authMiddleware.authUser, upload.single("resume"), generateInterviewReportController);
interviewRouter.get('/all-reports', authMiddleware.authUser, getAllInterviewReportsOfUser);
interviewRouter.get('/:reportId', authMiddleware.authUser, getInterviewReportByIdController);
interviewRouter.get('/pdf/:interviewReportId', authMiddleware.authUser, generateResumePdfController);
interviewRouter.get('/roadmap/all', fetchAllRoadmapsController);
// interviewRouter.post('/roadmap', authMiddleware.authUser, generateRoadmapController);

module.exports = interviewRouter;