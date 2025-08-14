const Project = require('../models/project');
const Defect = require('../models/defect');
const DefectStatus = require('../models/defect_status');

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
        defects: validDefects,
        defectDensity: defectDensity,
        color: color,
        meaning: meaning,
        range: range
    };
}

module.exports = { getDefectDensity };