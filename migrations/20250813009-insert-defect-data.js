'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample defect data
    await queryInterface.bulkInsert('defect', [
      {
        id: 1,
        defect_id: 'DEF001',
        description: 'Login button not working',
        re_open_count: 2,
        steps: '1. Open login page. 2. Click login button.',
        assigned_by: 1,
        assigned_to: 2,
        attachment: 'login_issue.png',
        project_id: 1,
        modules_id: 1,
        sub_module_id: 1,
        release_test_case_id: 1,
        severity_id: 1,
        type_id: 1,
        defect_status_id: 1,
        priority_id: 1
      },
      {
        id: 2,
        defect_id: 'DEF002',
        description: 'Payment gateway error',
        re_open_count: 1,
        steps: '1. Add product to cart. 2. Proceed to payment.',
        assigned_by: 2,
        assigned_to: 3,
        attachment: 'payment_error.png',
        project_id: 2,
        modules_id: 2,
        sub_module_id: 2,
        release_test_case_id: 2,
        severity_id: 2,
        type_id: 2,
        defect_status_id: 2,
        priority_id: 2
      },
      {
        id: 3,
        defect_id: 'DEF003',
        description: 'Search not returning results',
        re_open_count: 0,
        steps: '1. Enter product name. 2. Click search.',
        assigned_by: 3,
        assigned_to: 4,
        attachment: 'search_issue.png',
        project_id: 3,
        modules_id: 3,
        sub_module_id: 3,
        release_test_case_id: 3,
        severity_id: 3,
        type_id: 3,
        defect_status_id: 3,
        priority_id: 3
      },
      {
        id: 4,
        defect_id: 'DEF004',
        description: 'Order history not loading',
        re_open_count: 3,
        steps: '1. Go to order history. 2. Observe error.',
        assigned_by: 4,
        assigned_to: 5,
        attachment: 'order_history.png',
        project_id: 1,
        modules_id: 4,
        sub_module_id: 4,
        release_test_case_id: 4,
        severity_id: 4,
        type_id: 4,
        defect_status_id: 4,
        priority_id: 4
      },
      {
        id: 5,
        defect_id: 'DEF005',
        description: 'Profile update fails',
        re_open_count: 1,
        steps: '1. Go to profile. 2. Update details.',
        assigned_by: 5,
        assigned_to: 1,
        attachment: 'profile_update.png',
        project_id: 1,
        modules_id: 5,
        sub_module_id: 5,
        release_test_case_id: 5,
        severity_id: 5,
        type_id: 5,
        defect_status_id: 5,
        priority_id: 5
      }
    ], {});
    
      // Insert sample defect_history data
      await queryInterface.bulkInsert('defect_history', [
        {
          id: 1,
          defect_id: 1,
          assigned_by: 'admin001',
          assigned_to: 'dev001',
          defect_date: new Date('2024-01-10'),
          defect_ref_id: 'DEF001',
          defect_status: 'Open',
          defect_time: '10:00:00',
          previous_status: 'New',
          record_status: 'Active',
          release_id: 1
        },
        {
          id: 2,
          defect_id: 2,
          assigned_by: 'dev001',
          assigned_to: 'test001',
          defect_date: new Date('2024-01-12'),
          defect_ref_id: 'DEF002',
          defect_status: 'In Progress',
          defect_time: '11:00:00',
          previous_status: 'Open',
          record_status: 'Active',
          release_id: 2
        },
        {
          id: 3,
          defect_id: 3,
          assigned_by: 'test001',
          assigned_to: 'test002',
          defect_date: new Date('2024-01-15'),
          defect_ref_id: 'DEF003',
          defect_status: 'Resolved',
          defect_time: '12:00:00',
          previous_status: 'In Progress',
          record_status: 'Inactive',
          release_id: 3
        },
        {
          id: 4,
          defect_id: 4,
          assigned_by: 'test002',
          assigned_to: 'pm001',
          defect_date: new Date('2024-01-18'),
          defect_ref_id: 'DEF004',
          defect_status: 'Closed',
          defect_time: '13:00:00',
          previous_status: 'Resolved',
          record_status: 'Inactive',
          release_id: 4
        },
        {
          id: 5,
          defect_id: 5,
          assigned_by: 'pm001',
          assigned_to: 'admin001',
          defect_date: new Date('2024-01-20'),
          defect_ref_id: 'DEF005',
          defect_status: 'Reopened',
          defect_time: '14:00:00',
          previous_status: 'Closed',
          record_status: 'Active',
          release_id: 5
        }
      ], {});

      // Insert sample comments data
      await queryInterface.bulkInsert('comments', [
        {
          defect_id: 1,
          user_id: 2,
          comment: 'Initial defect reported.',
          attachment: 'defect1_attach.png'
        },
        {
          defect_id: 1,
          user_id: 3,
          comment: 'Reviewed and assigned.',
          attachment: 'defect1_review.png'
        },
        {
          defect_id: 2,
          user_id: 2,
          comment: 'Defect resolved.',
          attachment: 'defect2_resolved.png'
        }
      ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('defect', null, {});
    // Delete sample comments data
    await queryInterface.bulkDelete('comments', null, {});
  }
};
