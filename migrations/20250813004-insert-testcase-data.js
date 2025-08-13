'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample test cases
    await queryInterface.bulkInsert('testcase', [
      {
        test_case_id: 'TC001',
        description: 'Verify user can login with valid username and password',
        steps: '1. Enter valid username and password. 2. Click login button.',
        modules_id: 1, // User Authentication
        project_id: 1,
        sub_module_id: 1,
        type_id: 1,
        severity_id: 1
      },
      {
        test_case_id: 'TC002',
        description: 'Verify error message is shown for invalid password',
        steps: '1. Enter valid username and invalid password. 2. Click login button.',
        modules_id: 1,
        project_id: 1,
        sub_module_id: 1,
        type_id: 2,
        severity_id: 2
      },
      {
        test_case_id: 'TC003',
        description: 'Verify user can add product to shopping cart',
        steps: '1. Search for product. 2. Click add to cart.',
        modules_id: 3, // Shopping Cart
        project_id: 1,
        sub_module_id: 2,
        type_id: 1,
        severity_id: 3
      },
      {
        test_case_id: 'TC004',
        description: 'Verify error when trying to checkout with no items',
        steps: '1. Go to checkout with empty cart. 2. Observe error.',
        modules_id: 5, // Order Management
        project_id: 1,
        sub_module_id: 3,
        type_id: 3,
        severity_id: 2
      },
      {
        test_case_id: 'TC005',
        description: 'Verify user can search products by name',
        steps: '1. Enter product name in search bar. 2. Click search.',
        modules_id: 2, // Product Catalog
        project_id: 1,
        sub_module_id: 4,
        type_id: 2,
        severity_id: 1
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('testcase', null, {});
  }
};
