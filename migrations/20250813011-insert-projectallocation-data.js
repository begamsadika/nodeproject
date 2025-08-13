'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample project_allocation data
    await queryInterface.bulkInsert('project_allocation', [
      {
        id: 1,
        allocation_percentage: 50,
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-06-01'),
        project_id: 1,
        role_id: 1,
        user_id: 1
      },
      {
        id: 2,
        allocation_percentage: 75,
        start_date: new Date('2024-02-01'),
        end_date: new Date('2024-07-01'),
        project_id: 2,
        role_id: 2,
        user_id: 2
      },
      {
        id: 3,
        allocation_percentage: 100,
        start_date: new Date('2024-03-01'),
        end_date: new Date('2024-08-01'),
        project_id: 3,
        role_id: 3,
        user_id: 3
      }
    ], {});

    // Insert sample project_allocation_history data
    await queryInterface.bulkInsert('project_allocation_history', [
      {
        id: 1,
        allocation_percentage: 50,
        percentage: 50,
        start_date: new Date('2024-01-01'),
        status: true,
        project_id: 1,
        role_id: 1,
        user_id: 1
      },
      {
        id: 2,
        allocation_percentage: 75,
        percentage: 75,
        start_date: new Date('2024-02-01'),
        status: false,
        project_id: 2,
        role_id: 2,
        user_id: 2
      },
      {
        id: 3,
        allocation_percentage: 100,
        percentage: 100,
        start_date: new Date('2024-03-01'),
        status: true,
        project_id: 3,
        role_id: 3,
        user_id: 3
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('project_allocation', null, {});
    await queryInterface.bulkDelete('project_allocation_history', null, {});
  }
};
