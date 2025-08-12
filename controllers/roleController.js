// controllers/roleController.js
const roleRepo = require('../repository/roleRepo');

// Create a new role
const createRole = async (req, res) => {
  try {
    const { role_name } = req.body;
    if (!role_name) {
      return res.status(400).json({ message: 'role_name is required' });
    }

    const newRole = await roleRepo.createRole(role_name);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ message: 'Error creating role', error });
  }
};

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await roleRepo.getAllRoles();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles', error });
  }
};

// Get role by ID
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await roleRepo.getRoleById(id);

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching role', error });
  }
};

// Update role
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_name } = req.body;

    const updated = await roleRepo.updateRole(id, role_name);

    if (!updated) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating role', error });
  }
};

// Delete role
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await roleRepo.deleteRole(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting role', error });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
};
