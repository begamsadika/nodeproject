'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample group_privileges data
    await queryInterface.bulkInsert('group_privileges', [
      { id: 1, privilege_id: 1, role_id: 1 },
      { id: 2, privilege_id: 2, role_id: 2 },
      { id: 3, privilege_id: 3, role_id: 3 },
      { id: 4, privilege_id: 4, role_id: 4 },
      { id: 5, privilege_id: 5, role_id: 5 }
    ], {});

    // Insert sample project_user_privileges data
    await queryInterface.bulkInsert('project_user_privileges', [
      { id: 1, user_id: 1, project_id: 1, privilege_id: 1 },
      { id: 2, user_id: 2, project_id: 1, privilege_id: 2 },
      { id: 3, user_id: 3, project_id: 2, privilege_id: 3 },
      { id: 4, user_id: 4, project_id: 2, privilege_id: 4 },
      { id: 5, user_id: 5, project_id: 3, privilege_id: 5 }
    ], {});

    // Insert sample user_privileges data
    await queryInterface.bulkInsert('user_privileges', [
      { id: 1, user_id: 1, project_id: 1, privilege_id: 1 },
      { id: 2, user_id: 2, project_id: 1, privilege_id: 2 },
      { id: 3, user_id: 3, project_id: 2, privilege_id: 3 },
      { id: 4, user_id: 4, project_id: 2, privilege_id: 4 },
      { id: 5, user_id: 5, project_id: 3, privilege_id: 5 }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('group_privileges', null, {});
  }
};
