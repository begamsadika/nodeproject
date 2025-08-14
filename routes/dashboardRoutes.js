const express = require('express');

const router = express.Router();

const dashboardController = require('../controllers/dashboardController');

router.get('/', (req, res) => {
	res.send('Dashboard API is working');
});
router.get('/defect-density/:projectId', dashboardController.defectDensity);

module.exports = router;
