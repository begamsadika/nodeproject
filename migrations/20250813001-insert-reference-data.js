'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert designations
    await queryInterface.bulkInsert('designation', [
      { designation_name: 'Developer' },
      { designation_name: 'Senior Developer' },
      { designation_name: 'Lead Developer' },
      { designation_name: 'Tester' },
      { designation_name: 'Senior Tester' },
      { designation_name: 'Test Lead' },
      { designation_name: 'Manager' },
      { designation_name: 'Project Manager' },
      { designation_name: 'Team Lead' },
      { designation_name: 'Intern' }
    ], {});

    // Insert roles
    await queryInterface.bulkInsert('role', [
      { role_name: 'Admin' },
      { role_name: 'Project Manager' },
      { role_name: 'Developer' },
      { role_name: 'Tester' },
      { role_name: 'QA Lead' },
      { role_name: 'DevOps' },
      { role_name: 'Business Analyst' },
      { role_name: 'Support' },
      { role_name: 'Viewer' }
    ], {});

    // Insert priorities
    await queryInterface.bulkInsert('priority', [
      { color: 'red', priority: 'Critical' },
      { color: 'orange', priority: 'High' },
      { color: 'yellow', priority: 'Medium' },
      { color: 'green', priority: 'Low' },
      { color: 'blue', priority: 'Very Low' }
    ], {});

    // Insert severities
    await queryInterface.bulkInsert('severity', [
      { severity_color: 'red', severity_name: 'Critical', weight: 5 },
      { severity_color: 'orange', severity_name: 'Major', weight: 4 },
      { severity_color: 'yellow', severity_name: 'Minor', weight: 3 },
      { severity_color: 'green', severity_name: 'Trivial', weight: 2 },
      { severity_color: 'blue', severity_name: 'Cosmetic', weight: 1 }
    ], {});

    // Insert release types
    await queryInterface.bulkInsert('release_type', [
      { release_type_name: 'Alpha' },
      { release_type_name: 'Beta' },
      { release_type_name: 'Release Candidate' },
      { release_type_name: 'General Availability' },
      { release_type_name: 'Hotfix' },
      { release_type_name: 'Patch' }
    ], {});

    // Insert defect types
    await queryInterface.bulkInsert('defect_type', [
      { defect_type_name: 'UI/UX' },
      { defect_type_name: 'Backend Logic' },
      { defect_type_name: 'Database' },
      { defect_type_name: 'Performance' },
      { defect_type_name: 'Security' },
      { defect_type_name: 'Integration' },
      { defect_type_name: 'Configuration' }
    ], {});

    // Insert defect statuses
    await queryInterface.bulkInsert('defect_status', [
      { color_code: '#ff6b6b', defect_status_name: 'Open' },
      { color_code: '#4ecdc4', defect_status_name: 'In Progress' },
      { color_code: '#45b7d1', defect_status_name: 'Fixed' },
      { color_code: '#f9ca24', defect_status_name: 'Retest' },
      { color_code: '#6c5ce7', defect_status_name: 'Closed' },
      { color_code: '#a55eea', defect_status_name: 'Rejected' },
      { color_code: '#feca57', defect_status_name: 'Deferred' }
    ], {});

    // Insert privileges
    await queryInterface.bulkInsert('privilege', [
      { privilege_name: 'CREATE_PROJECT' },
      { privilege_name: 'EDIT_PROJECT' },
      { privilege_name: 'DELETE_PROJECT' },
      { privilege_name: 'VIEW_PROJECT' },
      { privilege_name: 'CREATE_USER' },
      { privilege_name: 'EDIT_USER' },
      { privilege_name: 'DELETE_USER' },
      { privilege_name: 'VIEW_USER' },
      { privilege_name: 'CREATE_DEFECT' },
      { privilege_name: 'EDIT_DEFECT' },
      { privilege_name: 'DELETE_DEFECT' },
      { privilege_name: 'VIEW_DEFECT' },
      { privilege_name: 'ASSIGN_TASKS' },
      { privilege_name: 'VIEW_REPORTS' },
      { privilege_name: 'ADMIN_ACCESS' }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('privilege', null, {});
    await queryInterface.bulkDelete('defect_status', null, {});
    await queryInterface.bulkDelete('defect_type', null, {});
    await queryInterface.bulkDelete('release_type', null, {});
    await queryInterface.bulkDelete('severity', null, {});
    await queryInterface.bulkDelete('priority', null, {});
    await queryInterface.bulkDelete('role', null, {});
    await queryInterface.bulkDelete('designation', null, {});
  }
};
