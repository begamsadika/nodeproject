// controllers/projectController.js

const projectService = require('../services/projectService');

/**
 * Create a new project
 */
async function createProject(req, res) {
  try {
    const newProject = await projectService.createProject(req.body);
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Get all projects with optional filters
 */
async function getAllProjects(req, res) {
  try {
    const options = {
      includeUser: req.query.includeUser === 'true',
      includeModules: req.query.includeModules === 'true',
      status: req.query.status,
      search: req.query.search
    };

    const projects = await projectService.getAllProjects(options);
    res.status(200).json({
      success: true,
      message: 'Projects retrieved successfully',
      data: projects,
      count: projects.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Get a project by ID
 */
async function getProjectById(req, res) {
  try {
    const id = req.params.id;
    const options = {
      includeUser: req.query.includeUser === 'true',
      includeModules: req.query.includeModules === 'true'
    };

    const project = await projectService.getProjectById(id, options);
    res.status(200).json({
      success: true,
      message: 'Project retrieved successfully',
      data: project
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Get a project by project_id
 */
async function getProjectByProjectId(req, res) {
  try {
    const projectId = req.params.projectId;
    const options = {
      includeUser: req.query.includeUser === 'true',
      includeModules: req.query.includeModules === 'true'
    };

    const project = await projectService.getProjectByProjectId(projectId, options);
    res.status(200).json({
      success: true,
      message: 'Project retrieved successfully',
      data: project
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Update a project by ID
 */
async function updateProject(req, res) {
  try {
    const id = req.params.id;
    const updated = await projectService.updateProject(id, req.body);
    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updated
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Delete a project by ID
 */
async function deleteProject(req, res) {
  try {
    const id = req.params.id;
    const result = await projectService.deleteProject(id);
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Get projects by status
 */
async function getProjectsByStatus(req, res) {
  try {
    const status = req.params.status;
    const projects = await projectService.getProjectsByStatus(status);
    res.status(200).json({
      success: true,
      message: `Projects with status '${status}' retrieved successfully`,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Get projects by user ID
 */
async function getProjectsByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const projects = await projectService.getProjectsByUserId(userId);
    res.status(200).json({
      success: true,
      message: `Projects for user ID '${userId}' retrieved successfully`,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * Get project statistics
 */
async function getProjectStatistics(req, res) {
  try {
    const stats = await projectService.getProjectStatistics();
    res.status(200).json({
      success: true,
      message: 'Project statistics retrieved successfully',
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectByProjectId,
  updateProject,
  deleteProject,
  getProjectsByStatus,
  getProjectsByUserId,
  getProjectStatistics
};