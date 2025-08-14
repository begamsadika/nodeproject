const express = require('express');
const router = express.Router();
const defectTypeController = require('../controllers/defect_typeController');

// Get all defect types
router.get('/', defectTypeController.getAllDefectTypes);

module.exports = router;