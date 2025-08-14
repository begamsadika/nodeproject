// services/projectService.js
const Project = require('../models/project');


/**
 * Get all projects 
 */
const getAllProjects = async()=>{
    return await Project.findAll();
};


module.exports = {
  getAllProjects
};