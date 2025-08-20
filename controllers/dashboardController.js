
const { getDefectDensity, getDefectSeverityIndex, getDefectToRemarkRatio } = require('../services/DashboardService');

// GET /api/dashboard/defect-density/:projectId
async function defectDensity(req, res) {
	try {
		const projectId = req.params.projectId;
		const result = await getDefectDensity(projectId);
		res.json({
			status: "success",
			message: "Defect density calculated successfully",
			data: result,
			statusCode: 2000
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

// GET /api/dashboard/defect-to-remark-ratio/:projectId
async function defectToRemarkRatio(req, res) {
	try {
		const projectId = req.params.projectId;
		const result = await getDefectToRemarkRatio(projectId);
		res.json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

module.exports = { defectDensity, defectSeverityIndex, defectToRemarkRatio };

// GET /api/dashboard/defect-severity-index/:projectId
async function defectSeverityIndex(req, res) {
	try {
		const projectId = req.params.projectId;
		const result = await getDefectSeverityIndex(projectId);
		res.json({
			status: "success",
			message: "Defect Severity Index calculated successfully",
			data: result,
			statusCode: 2000
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

// The defectSeverityIndex function is now included in the module.exports above.
