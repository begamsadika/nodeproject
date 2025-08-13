// services/projectService.js

const projectRepo = require('../repository/projectRepo');

/**
 * Create a new project
 */
async function createProject(data) {
  // Validation
  if (!data.project_id) {
    throw new Error('Project ID is required');
  }
  if (!data.project_name) {
    throw new Error('Project name is required');
  }
  if (!data.start_date) {
    throw new Error('Start date is required');
  }
  if (!data.project_status) {
    throw new Error('Project status is required');
  }

  // Check if project_id already exists
  const existingProject = await projectRepo.checkProjectIdExists(data.project_id);
  if (existingProject) {
    throw new Error('Project ID already exists');
  }

  // Validate project status
  const validStatuses = ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
  if (!validStatuses.includes(data.project_status)) {
    throw new Error('Invalid project status. Must be one of: ' + validStatuses.join(', '));
  }

  // Validate dates
  const startDate = new Date(data.start_date);
  if (isNaN(startDate.getTime())) {
    throw new Error('Invalid start date format');
  }

  if (data.end_date) {
    const endDate = new Date(data.end_date);
    if (isNaN(endDate.getTime())) {
      throw new Error('Invalid end date format');
    }
    if (endDate <= startDate) {
      throw new Error('End date must be after start date');
    }
  }

  // Validate email format if provided
  if (data.email && !isValidEmail(data.email)) {
    throw new Error('Invalid email format');
  }

  const newProject = await projectRepo.createProject(data);
  return newProject;
}

/**
 * Get all projects with optional filters
 */
async function getAllProjects(options = {}) {
  return await projectRepo.getAllProjects(options);
}

/**
 * Get project by ID
 */
async function getProjectById(id, options = {}) {
  const project = await projectRepo.getProjectById(id, options);
  if (!project) {
    throw new Error('Project not found');
  }
  return project;
}

/**
 * Get project by project_id
 */
async function getProjectByProjectId(projectId, options = {}) {
  const project = await projectRepo.getProjectByProjectId(projectId, options);
  if (!project) {
    throw new Error('Project not found');
  }
  return project;
}

/**
 * Update project by ID
 */
async function updateProject(id, data) {
  // Check if project exists
  const existingProject = await projectRepo.getProjectById(id);
  if (!existingProject) {
    throw new Error('Project not found');
  }

  // Validate project_id uniqueness if being updated
  if (data.project_id && data.project_id !== existingProject.project_id) {
    const projectIdExists = await projectRepo.checkProjectIdExists(data.project_id, id);
    if (projectIdExists) {
      throw new Error('Project ID already exists');
    }
  }

  // Validate project status if being updated
  if (data.project_status) {
    const validStatuses = ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
    if (!validStatuses.includes(data.project_status)) {
      throw new Error('Invalid project status. Must be one of: ' + validStatuses.join(', '));
    }
  }

  // Validate dates if being updated
  if (data.start_date) {
    const startDate = new Date(data.start_date);
    if (isNaN(startDate.getTime())) {
      throw new Error('Invalid start date format');
    }
  }

  if (data.end_date) {
    const endDate = new Date(data.end_date);
    if (isNaN(endDate.getTime())) {
      throw new Error('Invalid end date format');
    }

    const startDate = new Date(data.start_date || existingProject.start_date);
    if (endDate <= startDate) {
      throw new Error('End date must be after start date');
    }
  }

  // Validate email format if provided
  if (data.email && !isValidEmail(data.email)) {
    throw new Error('Invalid email format');
  }

  const updatedProject = await projectRepo.updateProject(id, data);
  return updatedProject;
}

/**
 * Delete project by ID
 */
async function deleteProject(id) {
  const project = await projectRepo.getProjectById(id);
  if (!project) {
    throw new Error('Project not found');
  }

  await projectRepo.deleteProject(id);
  return { message: 'Project deleted successfully' };
}

/**
 * Get projects by status
 */
async function getProjectsByStatus(status) {
  const validStatuses = ['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid project status. Must be one of: ' + validStatuses.join(', '));
  }

  return await projectRepo.getProjectsByStatus(status);
}

/**
 * Get projects by user ID
 */
async function getProjectsByUserId(userId) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  return await projectRepo.getProjectsByUserId(userId);
}

/**
 * Get project statistics
 */
async function getProjectStatistics() {
  const allProjects = await projectRepo.getAllProjects();

  const stats = {
    total: allProjects.length,
    planned: allProjects.filter(p => p.project_status === 'PLANNED').length,
    inProgress: allProjects.filter(p => p.project_status === 'IN_PROGRESS').length,
    completed: allProjects.filter(p => p.project_status === 'COMPLETED').length,
    cancelled: allProjects.filter(p => p.project_status === 'CANCELLED').length
  };

  return stats;
}

/**
 * Helper function to validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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