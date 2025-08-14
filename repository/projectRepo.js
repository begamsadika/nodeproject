const Project = require('../models/project');

/**
 * Get all projects with optional filters and includes
 */
const getAllProjects = async (options = {}) => {
  const queryOptions = {
    include: []
  };

  // Add user information if requested
  if (options.includeUser) {
    queryOptions.include.push({
      model: User,
      attributes: ['id', 'user_id', 'first_name', 'last_name', 'email']
    });
  }

  // Add modules information if requested
  if (options.includeModules) {
    queryOptions.include.push({
      model: Modules,
      attributes: ['id', 'module_id', 'module_name']
    });
  }

  

  return await Project.findAll(queryOptions);
};

module.exports = {
  getAllProjects
};
