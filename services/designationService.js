// services/designationService.js

const Designation = require('../models/designation');

/**
 * Create a new designation
 */
async function createDesignation(data) {
  if (!data.designation_name) {
    throw new Error('Designation name is required');
  }

  // You could also check for duplicates here, if needed

  const newDesignation = await Designation.create({
    designation_name: data.designation_name
  });

  return newDesignation;
}

/**
 * Get all designations
 */
async function getAllDesignations() {
  return await Designation.findAll();
}

/**
 * Get designation by ID
 */
async function getDesignationById(id) {
  const designation = await Designation.findByPk(id);
  if (!designation) {
    throw new Error('Designation not found');
  }
  return designation;
}

/**
 * Update designation by ID
 */
async function updateDesignation(id, data) {
  const designation = await Designation.findByPk(id);
  if (!designation) {
    throw new Error('Designation not found');
  }

  designation.designation_name = data.designation_name || designation.designation_name;

  await designation.save();
  return designation;
}

/**
 * Delete designation by ID
 */
async function deleteDesignation(id) {
  const designation = await Designation.findByPk(id);
  if (!designation) {
    throw new Error('Designation not found');
  }

  await designation.destroy();
  return { message: 'Designation deleted successfully' };
}

module.exports = {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation
};
