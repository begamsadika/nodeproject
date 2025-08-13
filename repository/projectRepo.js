const Project = require('../models/project');
const User = require('../models/user');
const Modules = require('../models/modules');
const { Op } = require('sequelize');

/**
 * Create a new project
 */
const createProject = async (projectData) => {
  return await Project.create(projectData);
};

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

  // Add filters
  if (options.status) {
    queryOptions.where = { project_status: options.status };
  }

  if (options.search) {
    queryOptions.where = {
      ...queryOptions.where,
      [Op.or]: [
        { project_name: { [Op.like]: `%${options.search}%` } },
        { project_id: { [Op.like]: `%${options.search}%` } },
        { client_name: { [Op.like]: `%${options.search}%` } }
      ]
    };
  }

  return await Project.findAll(queryOptions);
};

/**
 * Get project by ID
 */
const getProjectById = async (id, options = {}) => {
  const queryOptions = {
    where: { id },
    include: []
  };

  // Add user information
  if (options.includeUser) {
    queryOptions.include.push({
      model: User,
      attributes: ['id', 'user_id', 'first_name', 'last_name', 'email']
    });
  }

  // Add modules information
  if (options.includeModules) {
    queryOptions.include.push({
      model: Modules,
      attributes: ['id', 'module_id', 'module_name']
    });
  }

  return await Project.findOne(queryOptions);
};

/**
 * Get project by project_id (unique identifier)
 */
const getProjectByProjectId = async (projectId, options = {}) => {
  const queryOptions = {
    where: { project_id: projectId },
    include: []
  };

  if (options.includeUser) {
    queryOptions.include.push({
      model: User,
      attributes: ['id', 'user_id', 'first_name', 'last_name', 'email']
    });
  }

  if (options.includeModules) {
    queryOptions.include.push({
      model: Modules,
      attributes: ['id', 'module_id', 'module_name']
    });
  }

  return await Project.findOne(queryOptions);
};

/**
 * Update project by ID
 */
const updateProject = async (id, updateData) => {
  const project = await Project.findByPk(id);
  if (!project) return null;

  // Update fields
  Object.keys(updateData).forEach(key => {
    if (updateData[key] !== undefined) {
      project[key] = updateData[key];
    }
  });

  await project.save();
  return project;
};

/**
 * Delete project by ID
 */
const deleteProject = async (id) => {
  const project = await Project.findByPk(id);
  if (!project) return null;

  await project.destroy();
  return true;
};

/**
 * Get projects by status
 */
const getProjectsByStatus = async (status) => {
  return await Project.findAll({
    where: { project_status: status },
    include: [{
      model: User,
      attributes: ['id', 'user_id', 'first_name', 'last_name', 'email']
    }]
  });
};

/**
 * Get projects by user ID
 */
const getProjectsByUserId = async (userId) => {
  return await Project.findAll({
    where: { user_id: userId },
    include: [{
      model: User,
      attributes: ['id', 'user_id', 'first_name', 'last_name', 'email']
    }]
  });
};

/**
 * Check if project_id already exists
 */
const checkProjectIdExists = async (projectId, excludeId = null) => {
  const whereClause = { project_id: projectId };
  if (excludeId) {
    whereClause.id = { [Op.ne]: excludeId };
  }
  
  const project = await Project.findOne({ where: whereClause });
  return !!project;
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectByProjectId,
  updateProject,
  deleteProject,
  getProjectsByStatus,
  getProjectsByUserId,
  checkProjectIdExists
};
