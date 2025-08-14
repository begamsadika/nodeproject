const express = require('express');
const router =express.Router();

const defectController = require('../controllers/defectController');

router.get('/', defectController.getAllDefects);

module.exports = router;