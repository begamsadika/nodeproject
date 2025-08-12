// services/roleService.js

const Role = require('../models/role');

// Create a new role
const createRole = async (roleName) => {
  return await Role.create({ role_name: roleName });
};

// Get all roles
const getAllRoles = async () => {
  return await Role.findAll();
};

// Get role by ID
const getRoleById = async (id) => {
  return await Role.findByPk(id);
};

// Update role by ID
const updateRole = async (id, roleName) => {
  const role = await Role.findByPk(id);
  if (!role) return null;

  role.role_name = roleName;
  await role.save();
  return role;
};

// Delete role by ID
const deleteRole = async (id) => {
  const role = await Role.findByPk(id);
  if (!role) return null;

  await role.destroy();
  return true;
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
};
