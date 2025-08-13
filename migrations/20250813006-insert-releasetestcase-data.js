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
        test_time: '00:05:00',
        release_id: 1,
        test_case_id: 1,
        owner_id: 6
      },
      {
        id: 2,
        description: 'Checkout test for release',
        release_test_case_id: 'RTC002',
        test_case_status: 'In Progress',
        test_time: '00:10:00',
        release_id: 1,
        test_case_id: 2,
        owner_id: 6
      },
      {
        id: 3,
        description: 'Search test for release',
        release_test_case_id: 'RTC003',
        test_case_status: 'Passed',
        test_time: '00:03:00',
        release_id: 2,
        test_case_id: 3,
        owner_id: 7
      },
      {
        id: 4,
        description: 'Payment gateway test for release',
        release_test_case_id: 'RTC004',
        test_case_status: 'Failed',
        test_time: '00:07:00',
        release_id: 2,
        test_case_id: 4,
        owner_id: 7
      },
      {
        id: 5,
        description: 'Product catalog test for release',
        release_test_case_id: 'RTC005',
        test_case_status: 'Blocked',
        test_time: '00:04:00',
        release_id: 3,
        test_case_id: 5,
        owner_id: 8
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('release_test_case', null, {});
  }
};
