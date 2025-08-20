// Calculate Defect to Remark Ratio
async function getDefectToRemarkRatio(projectId) {
    // Get total, rejected, and duplicate defects
    const totalDefects = await Defect.count({ where: { project_id: projectId } });
    const rejectedDefects = await Defect.count({
        where: { project_id: projectId },
        include: [{
            model: DefectStatus,
            where: { defect_status_name: 'Reject' }
        }]
    });
    const duplicateDefects = await Defect.count({
        where: { project_id: projectId },
        include: [{
            model: DefectStatus,
            where: { defect_status_name: 'Duplicate' }
        }]
    });

    // Calculate valid defects
    const validDefects = totalDefects - (rejectedDefects + duplicateDefects);

    // Calculate defect to remark ratio
    const ratio = totalDefects > 0 ? parseFloat(((validDefects / totalDefects) * 100).toFixed(2)) : 0.0;

    return {
        status: "Success",
        message: "Defect to Remark Ratio calculated successfully",
        data: {
            projectId,
            totalDefects,
            validDefects,
            rejectedDefects,
            duplicateDefects,
            defectToRemarkRatio: ratio
        },
        statusCode: 2000
    };
}

// Remove individual export, use single object export below
// Calculate Defect Severity Index (DSI) using only valid defects
async function getDefectSeverityIndex(projectId) {
    // Severity weights (customize as needed)
    const severityWeights = {
        'Critical': 4,
        'High': 3,
        'Medium': 2,
        'Low': 1
    };

    // Get total, rejected, and duplicate defects
    const totalDefects = await Defect.count({ where: { project_id: projectId } });
    const rejectedDefects = await Defect.count({
        where: { project_id: projectId },
        include: [{
            model: DefectStatus,
            where: { defect_status_name: 'Reject' }
        }]
    });
    const duplicateDefects = await Defect.count({
        where: { project_id: projectId },
        include: [{
            model: DefectStatus,
            where: { defect_status_name: 'Duplicate' }
        }]
    });

    // Calculate valid defects
    const validDefects = totalDefects - (rejectedDefects + duplicateDefects);

    // Get all valid defects with severity
    const validDefectsArr = await Defect.findAll({
        where: { project_id: projectId },
        include: [
            { model: Severity, attributes: ['severity_name'] },
            { model: DefectStatus, attributes: ['defect_status_name'] }
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

    // Interpretation based on DSI percentage
    let interpretation = "";
    if (dsiPercentage <= 30) {
        interpretation = "Low risk";
    } else if (dsiPercentage <= 50) {
        interpretation = "Moderate risk";
    } else {
        interpretation = "Significant risk";
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
            interpretation
        },
        statusCode: 2000
    };
}

module.exports = {
    getDefectDensity,
    getDefectSeverityIndex,
    getDefectToRemarkRatio
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
            where: { defect_status_name: 'Reject' }
        }]
    });
    const duplicateDefects = await Defect.count({
        where: { project_id: projectId },
        include: [{
            model: DefectStatus,
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
        meaning = "Moderate Quality";
        range = "7.0 – 10.0";
    } else {
        color = "Red";
        meaning = "High Risk";
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
