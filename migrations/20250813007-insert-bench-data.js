'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample bench data
    await queryInterface.bulkInsert('bench', [
      {
        id: 1,
        bench_id: 'BENCH001',
        allocated: 2,
        availability: 3,
        user_id: 1
      },
      {
        id: 2,
        bench_id: 'BENCH002',
        allocated: 1,
        availability: 4,
        user_id: 2
      },
      {
        id: 3,
        bench_id: 'BENCH003',
        allocated: 0,
        availability: 5,
        user_id: 3
      },
      {
        id: 4,
        bench_id: 'BENCH004',
        allocated: 3,
        availability: 2,
        user_id: 4
      },
      {
        id: 5,
        bench_id: 'BENCH005',
        allocated: 4,
        availability: 1,
        user_id: 5
      }
    ], {});

      // Insert sample email_user data
      await queryInterface.bulkInsert('email_user', [
        {
          id: 1,
          defect_email_status: 1,
          module_allocation_email_status: 1,
          project_allocation_email_status: 1,
          submodule_allocation_email_status: 1,
          user_id: 1
        },
        {
          id: 2,
          defect_email_status: 0,
          module_allocation_email_status: 1,
          project_allocation_email_status: 0,
          submodule_allocation_email_status: 1,
          user_id: 2
        },
        {
          id: 3,
          defect_email_status: 1,
          module_allocation_email_status: 0,
          project_allocation_email_status: 1,
          submodule_allocation_email_status: 0,
          user_id: 3
        },
        {
          id: 4,
          defect_email_status: 0,
          module_allocation_email_status: 0,
          project_allocation_email_status: 1,
          submodule_allocation_email_status: 1,
          user_id: 4
        },
        {
          id: 5,
          defect_email_status: 1,
          module_allocation_email_status: 1,
          project_allocation_email_status: 0,
          submodule_allocation_email_status: 0,
          user_id: 5
        }
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bench', null, {});
  }
};
