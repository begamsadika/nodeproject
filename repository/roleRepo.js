// repositories/roleRepo.js
const Role = require('../models/role');

const createRole = async (roleName) => {
  return await Role.create({ role_name: roleName });
};

const getAllRoles = async () => {
  return await Role.findAll();
};

const getRoleById = async (id) => {
  return await Role.findByPk(id);
};

const updateRole = async (id, newName) => {
  const role = await Role.findByPk(id);
  if (!role) return null;

  role.role_name = newName;
  await role.save();
  return role;
};

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
