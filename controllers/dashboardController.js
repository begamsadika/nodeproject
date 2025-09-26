const { getDefectReopenDetails } = require('../services/dashboardService');

// GET /api/dashboard/defect-reopen-details/:projectId/:reopenCount
async function defectReopenDetailsController(req, res) {
	try {
		const projectId = req.params.projectId;
		const reopenCount = parseInt(req.params.reopenCount, 10);
		const result = await getDefectReopenDetails(projectId, reopenCount);
		res.json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}
const { getDefectReopenCounts } = require('../services/dashboardService');

// GET /api/dashboard/defect-reopen-counts/:projectId
async function defectReopenCountsController(req, res) {
	try {
		const projectId = req.params.projectId;
		const result = await getDefectReopenCounts(projectId);
		res.json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}
const {
	filterProjectsSummary,
	getHighRiskProjects,
	getMediumRiskProjects,
	getLowRiskProjects,
	getAllProjectsCardSummary
} = require('../services/dashboardService');
// GET /api/dashboard/project-card-summary/high-risk
async function highRiskProjectsController(req, res) {
	try {
		const result = await getHighRiskProjects();
		res.json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

// GET /api/dashboard/project-card-summary/medium-risk
async function mediumRiskProjectsController(req, res) {
	try {
		const result = await getMediumRiskProjects();
		res.json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

// GET /api/dashboard/project-card-summary/low-risk
async function lowRiskProjectsController(req, res) {
	try {
		const result = await getLowRiskProjects();
		res.json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

// GET /api/dashboard/project-card-summary/all
async function allProjectsCardSummaryController(req, res) {
	try {
		const result = await getAllProjectsCardSummary();
		res.json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}
// GET /api/dashboard/filter-projects-summary
async function filterProjectsSummaryController(req, res) {
	try {
		const result = await filterProjectsSummary();
		res.json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}
const { getProjectCardColorSummary } = require('../services/dashboardService');
// GET /api/dashboard/project-card-summary/:projectId? (projectId optional)
async function projectCardColorSummary(req, res) {
	try {
		const projectId = req.params.projectId || null;
		const result = await getProjectCardColorSummary(projectId);
		res.json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}
// GET /api/dashboard/defect-severity-summary/:projectId
async function defectSeveritySummary(req, res) {
	try {
		const projectId = req.params.projectId;
		const result = await getDefectSeveritySummary(projectId);
		res.json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

const { getDefectDensity, getDefectSeverityIndex, getDefectToRemarkRatio, getDefectDistributionByType, getDefectByModule, getDefectSeveritySummary } = require('../services/dashboardService');
// GET /api/dashboard/defect-by-module/:projectId
async function defectByModule(req, res) {
	try {
		const projectId = req.params.projectId;
		const result = await getDefectByModule(projectId);
		res.json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

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

// GET /api/dashboard/defect-distribution-by-type/:projectId
async function defectDistributionByType(req, res) {
	try {
		const projectId = req.params.projectId;
		const result = await getDefectDistributionByType(projectId);
		res.json(result);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
}

module.exports = {
	defectDensity,
	defectSeverityIndex,
	defectToRemarkRatio,
	defectDistributionByType,
	defectByModule,
	defectSeveritySummary,
	projectCardColorSummary,
	filterProjectsSummaryController,
	highRiskProjectsController,
	mediumRiskProjectsController,
	lowRiskProjectsController,
	allProjectsCardSummaryController
	,defectReopenCountsController
	,defectReopenDetailsController
};

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
