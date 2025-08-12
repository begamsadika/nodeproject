const Designation = require('../models/designation');


//this is the name of the designation you want to save in the DB.
const createDesignation = async (designationName) => {
  return await Designation.create({ designation_name: designationName });
  //waits for the DB insert operation to finish.
};

const getAllDesignations = async () => {
  return await Designation.findAll();
};

const getDesignationById = async (id) => {
  return await Designation.findByPk(id);
};

const updateDesignation = async (id, newName) => {
  const designation = await Designation.findByPk(id);
  if (!designation) return null;

  designation.designation_name = newName;
  await designation.save();
  return designation;
};

const deleteDesignation = async (id) => {
  const designation = await Designation.findByPk(id);
  if (!designation) return null;

  await designation.destroy();// Delete this record from the database, wait until done
  return true;
};

module.exports = {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation
};
