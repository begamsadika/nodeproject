/**
 * Get only High Risk projects (colorCode: Red, status: High Risk)
 */
async function getHighRiskProjects() {
    const allProjects = await getProjectCardColorSummary();
    const high = [];
    if (allProjects && allProjects.data) {
        for (const proj of allProjects.data) {
            if (proj.status && proj.status === 'High Risk') {
                high.push(proj);
            }
        }
    }
    return {
        status: "success",
        message: "High Risk projects",
        statusCode: 2000,
        count: high.length,
        projects: high
    };
}

/**
 * Get only Medium Risk projects (colorCode: Yellow, status: Medium Risk)
 */
async function getMediumRiskProjects() {
    const allProjects = await getProjectCardColorSummary();
    const medium = [];
    if (allProjects && allProjects.data) {
        for (const proj of allProjects.data) {
            if (proj.status && proj.status === 'Medium Risk') {
                medium.push(proj);
            }
        }
    }
    return {
        status: "success",
        message: "Medium Risk projects",
        statusCode: 2000,
        count: medium.length,
        projects: medium
    };
}

/**
 * Get only Low Risk projects (colorCode: Green, status: Low Risk)
 */
async function getLowRiskProjects() {
    const allProjects = await getProjectCardColorSummary();
    const low = [];
    if (allProjects && allProjects.data) {
        for (const proj of allProjects.data) {
            if (proj.status && proj.status === 'Low Risk') {
                low.push(proj);
            }
        }
    }
    return {
        status: "success",
        message: "Low Risk projects",
        statusCode: 2000,
        count: low.length,
        projects: low
    };
}

/**
 * Get all projects (no risk filter)
 */
async function getAllProjectsCardSummary() {
    const allProjects = await getProjectCardColorSummary();
    return {
        status: "success",
        message: "All projects",
        statusCode: 2000,
        count: allProjects.data ? allProjects.data.length : 0,
        projects: allProjects.data || []
    };
}
/**
 * Get all projects grouped by risk (high, medium, low) with counts and project cards
 * Returns: { high: { count, projects: [...] }, medium: { count, projects: [...] }, low: { count, projects: [...] }, all: [...] }
 */
async function filterProjectsSummary() {
    const allProjects = await getProjectCardColorSummary();
    const high = [], medium = [], low = [];
    if (allProjects && allProjects.data) {
        for (const proj of allProjects.data) {
            if (proj.status && proj.status.toLowerCase().includes('high')) {
                high.push(proj);
            } else if (proj.status && proj.status.toLowerCase().includes('medium')) {
                medium.push(proj);
            } else {
                low.push(proj);
            }
        }
    }
    return {
        status: "success",
        message: "Filtered projects by risk",
        statusCode: 2000,
        high: { count: high.length, projects: high },
        medium: { count: medium.length, projects: medium },
        low: { count: low.length, projects: low },
        all: allProjects.data || []
    };
}
/**
 * Get modules type for a project
 * Valid Defects = Total defects - (duplicate + rejected)
 * Each module type percentage = (each module type count / total all modules by defects count ) * 100
 */
async function getDefectByModule(projectId) {
    const defects = await Defect.findAll({
        where: { project_id: projectId },
        include: [
            { model: require('../models/modules'), attributes: ['module_name'] },
            { model: DefectStatus, as: 'DefectStatus', attributes: ['defect_status_name'] }
        ]
    });

    // Filter valid defects (not 'Reject' or 'Duplicate')
    const validDefects = defects.filter(defect => {
        const status = defect.DefectStatus?.defect_status_name;
        return status !== 'Reject' && status !== 'Duplicate';
    });

    // Count valid defects by module name
    const modulesCounts = {};
    validDefects.forEach(defect => {
        const moduleName = defect.module?.module_name || defect.modules?.module_name || 'Unknown';
        modulesCounts[moduleName] = (modulesCounts[moduleName] || 0) + 1;
    });

    // Calculate total valid defects (all modules)
    const totalValidDefects = validDefects.length;

    // Prepare distribution array with percentage
    const distribution = Object.entries(modulesCounts).map(([module, count]) => {
        const percentage = totalValidDefects > 0 ? parseFloat(((count / totalValidDefects) * 100).toFixed(2)) : 0.0;
        return {
            module,
            count,
            percentage
        };
    });

    // Sort by count descending
    distribution.sort((a, b) => b.count - a.count);

    return {
        status: "success",
        statusCode: 2000,
        data: {
            projectId,
            totalValidDefects,
            distribution
        }
    };
}
/**
 * Get project card color and metrics summary for all projects or a specific project
 * Returns severityIndex, remarkRatio, densityMeter, status, colorCode for each project
 */
async function getProjectCardColorSummary(projectId = null) {
    // Fetch all projects or a specific project
    const where = projectId ? { id: projectId } : {};
    const projects = await Project.findAll({ where });
    const results = [];

    for (const project of projects) {
        const pid = project.id;
        // Get Severity Index
        let severityIndex = "Low";
        let remarkRatio = "Low";
        let densityMeter = "Low";
        let colorCode = "Green";
        let status = "Low Risk";

        // Get DSI
        let dsiResult = await getDefectSeverityIndex(pid);
        if (dsiResult && dsiResult.data && dsiResult.data.interpretation) {
            severityIndex = dsiResult.data.interpretation;
        }

        // Get Remark Ratio
        let remarkResult = await getDefectToRemarkRatio(pid);
        if (remarkResult && remarkResult.data && remarkResult.data.category) {
            remarkRatio = remarkResult.data.category;
        }

        // Get Defect Density
        let densityResult = await getDefectDensity(pid);
        if (densityResult && densityResult.meaning) {
            if (densityResult.meaning === "High Risk") {
                densityMeter = "High";
            } else if (densityResult.meaning === "Moderate Quality" || densityResult.meaning === "Medium") {
                densityMeter = "Medium";
            } else {
                densityMeter = "Low";
            }
        }


        // Special case: if all metrics are 0 (new project, no defects/remarks/severity)
        const isNewProject =
            (dsiResult && dsiResult.data && dsiResult.data.totalDefects === 0) &&
            (remarkResult && remarkResult.data && remarkResult.data.defects === 0) &&
            (densityResult && densityResult.totalDefects === 0);

        if (isNewProject) {
            status = "Low Risk";
            colorCode = "Green";
        } else if ([severityIndex, remarkRatio, densityMeter].includes("High")) {
            colorCode = "Red";
            status = "High Risk";
        } else if ([severityIndex, remarkRatio, densityMeter].includes("Medium")) {
            colorCode = "Yellow";
            status = "Medium Risk";
        } else {
            colorCode = "Green";
            status = "Low Risk";
        }

        results.push({
            projectName: project.project_name,
            severityIndex,
            remarkRatio,
            densityMeter,
            status,
            colorCode
        });
    }

    return {
        status: "success",
        message: "Retrieved successfully",
        statusCode: 2000,
        data: results
    };
}
// Calculate Defect to Remark Ratio
async function getDefectToRemarkRatio(projectId) {
    // Get total, rejected, and duplicate defects
    const totalDefects = await Defect.count({ where: { project_id: projectId } });
    const rejectedDefects = await Defect.count({
        where: { project_id: projectId },
        include: [{
            model: DefectStatus,
            as: 'DefectStatus',
            where: { defect_status_name: 'Reject' }
        }]
    });
    const duplicateDefects = await Defect.count({
        where: { project_id: projectId },
        include: [{
            model: DefectStatus,
            as: 'DefectStatus',
            where: { defect_status_name: 'Duplicate' }
        }]
    });

    // Calculate valid defects
    const validDefects = totalDefects - (rejectedDefects + duplicateDefects);

    // Calculate defect to remark ratio
    const ratioValue = totalDefects > 0 ? (validDefects / totalDefects) * 100 : 0.0;
    const ratio = parseFloat(ratioValue.toFixed(2));

    let category, color;
    if (ratio >= 98 && ratio <= 100) {
        category = "Low";
        color = "Green";
    } else if (ratio >= 90 && ratio < 98) {
        category = "Medium";
        color = "Yellow";
    } else if (ratio < 90) {
        category = "High";
        color = "Red";
    }

    return {
        status: "Success",
        message: "Defect to Remark Ratio fetched successfully",
        data: {
            remarks: validDefects,
            defects: totalDefects,
            ratio: `${ratio.toFixed(2)}%`,
            category,
            color
        },
        statusCode: 2000
    };
}

// Remove individual export, use single object export below
// Calculate Defect Severity Index (DSI) using only valid defects
async function getDefectSeverityIndex(projectId) {
    // Fetch severity weights dynamically from the Severity table
    const severities = await Severity.findAll({ attributes: ['severity_name', 'weight'] });
    const severityWeights = {};
    severities.forEach(sev => {
        severityWeights[sev.severity_name] = sev.weight;
    });

    // Get total, rejected, and duplicate defects
    const totalDefects = await Defect.count({ where: { project_id: projectId } });
    const rejectedDefects = await Defect.count({
        where: { project_id: projectId },
        include: [{
            model: DefectStatus,
            as: 'DefectStatus',
            where: { defect_status_name: 'Reject' }
        }]
    });
    const duplicateDefects = await Defect.count({
        where: { project_id: projectId },
        include: [{
            model: DefectStatus,
            as: 'DefectStatus',
            where: { defect_status_name: 'Duplicate' }
        }]
    });

    // Calculate valid defects
    const validDefects = totalDefects - (rejectedDefects + duplicateDefects);

    // Get all valid defects with severity
    const validDefectsArr = await Defect.findAll({
        where: { project_id: projectId },
        include: [
            { model: Severity, as: 'Severity', attributes: ['severity_name'] },
            { model: DefectStatus, as: 'DefectStatus', attributes: ['defect_status_name'] }
        ]
    });
    const filteredValidDefects = validDefectsArr.filter(defect => {
        const status = defect.DefectStatus?.defect_status_name;
        return status !== 'Reject' && status !== 'Duplicate';
    });

    // Count valid defects by severity name
    const defectCounts = {};
    filteredValidDefects.forEach(defect => {
        const sev = defect.Severity?.severity_name;
        if (sev) {
            defectCounts[sev] = (defectCounts[sev] || 0) + 1;
        }
    });

    // Calculate Actual Severity Score
    let actualSeverityScore = 0;
    let maxWeight = 0;
    Object.keys(severityWeights).forEach(sev => {
        const count = defectCounts[sev] || 0;
        const weight = severityWeights[sev];
        actualSeverityScore += count * weight;
        if (weight > maxWeight) maxWeight = weight;
    });

    // Maximum Possible Severity Score
    const maximumSeverityScore = validDefects * maxWeight;

    // %DSI calculation
    const dsiPercentage = maximumSeverityScore > 0 ? parseFloat(((actualSeverityScore / maximumSeverityScore) * 100).toFixed(6)) : 0.0;

    // Interpretation and color based on DSI percentage
    let interpretation = "", color = "";
    if (dsiPercentage >= 50) {
        interpretation = "High";
        color = "Red";
    } else if (dsiPercentage >= 25) {
        interpretation = "Medium";
        color = "Yellow";
    } else {
        interpretation = "Low";
        color = "Green";
    }

    return {
        status: "Success",
        message: "DSI calculated successfully",
        data: {
            projectId,
            totalDefects,
            actualSeverityScore,
            maximumSeverityScore,
            dsiPercentage,
            interpretation,
            color
        },
        statusCode: 2000
    };
}

async function getDefectSeveritySummary(projectId) {
    // 1. Fetch project details
    const project = await Project.findByPk(projectId);
    if (!project) {
        throw new Error(`Project not found with ID: ${projectId}`);
    }

    // 2. Fetch all defects for the project with their severity and status
    const defects = await Defect.findAll({
        where: { project_id: projectId },
        include: [
            { model: Severity, as: 'Severity', attributes: ['severity_name'] },
            { model: DefectStatus, as: 'DefectStatus', attributes: ['defect_status_name'] }
        ]
    });

    // 3. Group defects by severity and then by status
    const defectSummaryMap = {};
    let totalDefects = 0;

    defects.forEach(defect => {
        const severityName = defect.Severity?.severity_name;
        const defectStatusName = defect.DefectStatus?.defect_status_name;

        if (severityName && defectStatusName) {
            totalDefects++;
            if (!defectSummaryMap[severityName]) {
                defectSummaryMap[severityName] = {
                    severity: severityName,
                    Severity_color: '', // Will be assigned later
                    total: 0,
                    statuses: {}
                };
            }
            if (!defectSummaryMap[severityName].statuses[defectStatusName]) {
                defectSummaryMap[severityName].statuses[defectStatusName] = {
                    count: 0,
                    color: '' // Will be assigned later
                };
            }
            defectSummaryMap[severityName].total++;
            defectSummaryMap[severityName].statuses[defectStatusName].count++;
        }
    });

    // Hardcoded colors for severity
    const severityColors = {
        "Critical": "Red",
        "High": "Orange",
        "Medium": "Yellow",
        "Low": "Green"
    };

    // Fetch all defect statuses and their color codes from the database
    const allStatuses = await DefectStatus.findAll({ attributes: ['defect_status_name', 'color_code'] });
    const statusColors = {};
    allStatuses.forEach(status => {
        statusColors[status.defect_status_name] = status.color_code || 'Black';
    });

    // 4. Transform defectSummaryMap into the desired array format and assign colors
    const defectSummary = Object.values(defectSummaryMap).map(summary => {
        const statuses = {};
        Object.keys(summary.statuses).forEach(statusName => {
            statuses[statusName] = {
                count: summary.statuses[statusName].count,
                color: statusColors[statusName] || 'Black'
            };
        });
        return {
            severity: summary.severity,
            Severity_color: severityColors[summary.severity] || 'Black',
            total: summary.total,
            statuses: statuses
        };
    });

    // Ensure a consistent order for severity levels
    const orderedSeverityNames = ["Critical", "High", "Medium", "Low"];
    defectSummary.sort((a, b) => orderedSeverityNames.indexOf(a.severity) - orderedSeverityNames.indexOf(b.severity));


    // 5. Prepare the final response
    return {
        status: "success",
        statusCode: 2000,
        projectId: projectId,
        projectName: project.project_name,
        totalDefects: totalDefects,
        defectSummary: defectSummary
    };
}


/**
 * Get defect distribution by type for a project
 * Valid Defects = Total defects - (duplicate + rejected)
 * Each Defect Type percentage = (each defect type count / total valid defects) * 100
 */
async function getDefectDistributionByType(projectId) {
    // 1. Fetch all defects for the project with their type and status
    const defects = await Defect.findAll({
        where: { project_id: projectId },
        include: [
            { model: require('../models/defect_type'), as: 'defect_type', attributes: ['defect_type_name'] },
            { model: DefectStatus, as: 'DefectStatus', attributes: ['defect_status_name'] }
        ]
    });

    // 2. Filter valid defects (not 'Reject' or 'Duplicate')
    const validDefects = defects.filter(defect => {
        const status = defect.DefectStatus?.defect_status_name;
        return status !== 'Reject' && status !== 'Duplicate';
    });

    // 3. Count valid defects by defect type
    const defectTypeCounts = {};
    validDefects.forEach(defect => {
        const type = defect.defect_type?.defect_type_name || 'Unknown';
        defectTypeCounts[type] = (defectTypeCounts[type] || 0) + 1;
    });

    // 4. Calculate total valid defects
    const totalValidDefects = validDefects.length;

    // 5. Prepare distribution array with percentage
    const distribution = Object.entries(defectTypeCounts).map(([type, count]) => {
        const percentage = totalValidDefects > 0 ? parseFloat(((count / totalValidDefects) * 100).toFixed(1)) : 0.0;
        return {
            defectType: type,
            count,
            percentage
        };
    });

    // 6. Sort by count descending
    distribution.sort((a, b) => b.count - a.count);

    return {
        status: "success",
        statusCode: 2000,
        data: {
            projectId,
            totalValidDefects,
            distribution
        }
    };
}

module.exports = {
    getDefectDensity,
    getDefectSeverityIndex,
    getDefectToRemarkRatio,
    getDefectSeveritySummary,
    getDefectDistributionByType,
    getProjectCardColorSummary,
    getDefectByModule,
    filterProjectsSummary,
    getHighRiskProjects,
    getMediumRiskProjects,
    getLowRiskProjects,
    getAllProjectsCardSummary
};




const Project = require('../models/project');
const Defect = require('../models/defect');
const DefectStatus = require('../models/defect_status');
const Severity = require('../models/severity');

async function getDefectDensity(projectId) {
    // 1️⃣ Fetch project details
    const project = await Project.findByPk(projectId);
    if (!project) {
        throw new Error(`Project not found with ID: ${projectId}`);
    }

    // 2️⃣ Count total defects for this project
    const totalDefects = await Defect.count({ where: { project_id: projectId } });

    // 3️⃣ Count rejected & duplicate defects
    const rejectedDefects = await Defect.count({
        where: { project_id: projectId },
        include: [{
            model: DefectStatus,
            as: 'DefectStatus',
            where: { defect_status_name: 'Reject' }
        }]
    });
    const duplicateDefects = await Defect.count({
        where: { project_id: projectId },
        include: [{
            model: DefectStatus,
            as: 'DefectStatus',
            where: { defect_status_name: 'Duplicate' }
        }]
    });

    // 4️⃣ Calculate valid defects
    const validDefects = totalDefects - (rejectedDefects + duplicateDefects);

    // 5️⃣ Calculate defect density
    const kloc = project.kloc;
    const defectDensity = kloc > 0 ? parseFloat((validDefects / kloc).toFixed(4)) : 0.0;

    // 6️⃣ Determine color, meaning, and range
    let color, meaning, range;
    if (defectDensity <= 7.0) {
        color = "Green";
        meaning = "Good";
        range = "0.0 – 7.0";
    } else if (defectDensity <= 10.0) {
        color = "Yellow";
        meaning = "Medium";
        range = "7.0 – 10.0";
    } else {
        color = "Red";
        meaning = "High";
        range = "Above 10.0";
    }

    // 7️⃣ Prepare response object
    return {
        projectId: projectId,
        projectName: project.project_name,
        clientName: project.client_name,
        kloc: kloc,
    validDefects: validDefects,
    totalDefects: totalDefects,
        rejectedDefects,
        duplicateDefects,
        defectDensity: defectDensity,
        color: color,
        meaning: meaning,
        range: range
    };
}

// Already exported above with getDefectSeverityIndex
