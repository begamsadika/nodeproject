
const { getDefectDensity } = require('../services/DashboardService');

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

module.exports = { defectDensity };
