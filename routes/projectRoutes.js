// routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Create a new project
router.post('/', projectController.createProject);

// Get all projects (with optional query parameters for filtering)
// Query params: ?includeUser=true&includeModules=true&status=IN_PROGRESS&search=searchTerm
router.get('/', projectController.getAllProjects);

// Get project statistics
router.get('/statistics', projectController.getProjectStatistics);

// Get projects by status
router.get('/status/:status', projectController.getProjectsByStatus);

// Get projects by user ID
router.get('/user/:userId', projectController.getProjectsByUserId);

// Get a single project by ID (numeric ID)
router.get('/:id', projectController.getProjectById);

// Get a single project by project_id (string identifier)
router.get('/project-id/:projectId', projectController.getProjectByProjectId);

// Update a project by ID
router.put('/:id', projectController.updateProject);

// Delete a project by ID
router.delete('/:id', projectController.deleteProject);

module.exports = router;