const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const { createStudyPlanController, uploadMaterialController, getStudyPlanController, getAllStudyPlansController } = require("../controllers/study.controller");
const upload = require("../middleware/file.middleware");

router.post("/plan", authMiddleware.authUser, createStudyPlanController);
router.get("/plan/:planId", authMiddleware.authUser, getStudyPlanController);
router.get("/plans", authMiddleware.authUser, getAllStudyPlansController);
router.post("/material", authMiddleware.authUser, upload.single("file"), uploadMaterialController);

module.exports = router;