const express = require('express');

const router = express.Router();

const dashboardController = require('../controllers/dashboardController');
router.get('/defect-reopen-details/:projectId/:reopenCount', dashboardController.defectReopenDetailsController);
router.get('/defect-reopen-counts/:projectId', dashboardController.defectReopenCountsController);

router.get('/', (req, res) => {
	res.send('Dashboard API is working');
});

router.get('/defect-density/:projectId', dashboardController.defectDensity);
router.get('/defect-severity-index/:projectId', dashboardController.defectSeverityIndex);
router.get('/defect-to-remark-ratio/:projectId', dashboardController.defectToRemarkRatio);
router.get('/defect-distribution-by-type/:projectId', dashboardController.defectDistributionByType);
router.get('/defect-by-module/:projectId', dashboardController.defectByModule);
router.get('/defect-severity-summary/:projectId', dashboardController.defectSeveritySummary);
router.get('/project-card-summary', dashboardController.projectCardColorSummary);
router.get('/project-card-summary/:projectId', dashboardController.projectCardColorSummary);

// // Project card summary by risk endpoints
// router.get('/project-card-summary/high-risk', dashboardController.highRiskProjectsController);
// router.get('/project-card-summary/medium-risk', dashboardController.mediumRiskProjectsController);
// router.get('/project-card-summary/low-risk', dashboardController.lowRiskProjectsController);
// router.get('/project-card-summary/all', dashboardController.allProjectsCardSummaryController);

// router.get('/filter-projects-summary', dashboardController.filterProjectsSummaryController);

module.exports = router;
