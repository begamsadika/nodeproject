// routes/roleRoutes.js

const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');

// Create a new role
router.post('/', roleController.createRole);

// Get all roles
router.get('/', roleController.getAllRoles);

// Get role by ID
router.get('/:id', roleController.getRoleById);

// Update role by ID
router.put('/:id', roleController.updateRole);

// Delete role by ID
router.delete('/:id', roleController.deleteRole);

module.exports = router;
