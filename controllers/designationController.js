// controllers/designationController.js

const designationService = require('../services/designationService');

/**
 * Create a new designation
 */
async function createDesignation(req, res) {
  try {
    const newDesignation = await designationService.createDesignation(req.body);
    res.status(201).json(newDesignation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * Get all designations
 */
async function getAllDesignations(req, res) {
  try {
    const designations = await designationService.getAllDesignations();
    res.status(200).json(designations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get a designation by ID
 */
async function getDesignationById(req, res) {
  try {
    const id = req.params.id;
    const designation = await designationService.getDesignationById(id);
    res.status(200).json(designation);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

/**
 * Update a designation by ID
 */
async function updateDesignation(req, res) {
  try {
    const id = req.params.id;
    const updated = await designationService.updateDesignation(id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

/**
 * Delete a designation by ID
 */
async function deleteDesignation(req, res) {
  try {
    const id = req.params.id;
    const result = await designationService.deleteDesignation(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
};
