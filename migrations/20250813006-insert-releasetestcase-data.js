'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample release test cases
    await queryInterface.bulkInsert('release_test_case', [
      {
        id: 1,
        description: 'Login test for release',
        release_test_case_id: 'RTC001',
        test_case_status: 'Not Started',
        test_time: '00:05:00'
      },
      {
        id: 2,
        description: 'Checkout test for release',
        release_test_case_id: 'RTC002',
        test_case_status: 'In Progress',
        test_time: '00:10:00'
      },
      {
        id: 3,
        description: 'Search test for release',
        release_test_case_id: 'RTC003',
        test_case_status: 'Passed',
        test_time: '00:03:00'
      },
      {
        id: 4,
        description: 'Payment gateway test for release',
        release_test_case_id: 'RTC004',
        test_case_status: 'Failed',
        test_time: '00:07:00'
      },
      {
        id: 5,
        description: 'Product catalog test for release',
        release_test_case_id: 'RTC005',
        test_case_status: 'Blocked',
        test_time: '00:04:00'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('release_test_case', null, {});
  }
};
