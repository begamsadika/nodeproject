// routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Get all projects (with optional query parameters for filtering)
// Query params: ?includeUser=true&includeModules=true&status=IN_PROGRESS&search=searchTerm
router.get('/', projectController.getAllProjects);

module.exports = router;