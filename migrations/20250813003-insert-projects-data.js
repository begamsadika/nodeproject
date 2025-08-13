'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample projects
    await queryInterface.bulkInsert('project', [
      {
        project_id: 'PROJ001',
        project_name: 'E-Commerce Platform',
        description: 'Online shopping platform with payment integration',
        client_name: 'TechCorp Inc',
        country: 'USA',
        phone_no: 1234567890,
        email: 'contact@techcorp.com',
        state: 'California',
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-12-31'),
        kloc: 50.5,
        project_status: 'IN_PROGRESS',
        user_id: 6 // Project Manager
      },
      {
        project_id: 'PROJ002',
        project_name: 'Mobile Banking App',
        description: 'Secure mobile banking application',
        client_name: 'FinanceBank',
        country: 'Canada',
        phone_no: 1234567891,
        email: 'tech@financebank.com',
        state: 'Ontario',
        start_date: new Date('2024-03-01'),
        end_date: new Date('2025-02-28'),
        kloc: 75.2,
        project_status: 'PLANNED',
        user_id: 6 // Project Manager
      },
      {
        project_id: 'PROJ003',
        project_name: 'Inventory Management System',
        description: 'Warehouse and inventory tracking system',
        client_name: 'LogisticsPro',
        country: 'UK',
        phone_no: 1234567892,
        email: 'support@logisticspro.com',
        state: 'London',
        start_date: new Date('2023-06-01'),
        end_date: new Date('2024-05-31'),
        kloc: 30.8,
        project_status: 'COMPLETED',
        user_id: 6 // Project Manager
      }
    ], {});

    // Insert modules for projects
    await queryInterface.bulkInsert('modules', [
      // E-Commerce Platform modules
      { module_id: 'MOD001', module_name: 'User Authentication', project_id: 1 },
      { module_id: 'MOD002', module_name: 'Product Catalog', project_id: 1 },
      { module_id: 'MOD003', module_name: 'Shopping Cart', project_id: 1 },
      { module_id: 'MOD004', module_name: 'Payment Gateway', project_id: 1 },
      { module_id: 'MOD005', module_name: 'Order Management', project_id: 1 },

      // Mobile Banking App modules
      { module_id: 'MOD006', module_name: 'Account Management', project_id: 2 },
      { module_id: 'MOD007', module_name: 'Transaction History', project_id: 2 },
      { module_id: 'MOD008', module_name: 'Fund Transfer', project_id: 2 },
      { module_id: 'MOD009', module_name: 'Bill Payment', project_id: 2 },
      { module_id: 'MOD010', module_name: 'Security Features', project_id: 2 },

      // Inventory Management System modules
      { module_id: 'MOD011', module_name: 'Stock Tracking', project_id: 3 },
      { module_id: 'MOD012', module_name: 'Supplier Management', project_id: 3 },
      { module_id: 'MOD013', module_name: 'Reports & Analytics', project_id: 3 },
      { module_id: 'MOD014', module_name: 'Barcode Scanner', project_id: 3 }
    ], {});

    // Insert sub-modules
    await queryInterface.bulkInsert('sub_module', [
      // User Authentication sub-modules
      { sub_module_id: 'SUB001', sub_module_name: 'Login', modules_id: 1 },
      { sub_module_id: 'SUB002', sub_module_name: 'Registration', modules_id: 1 },
      { sub_module_id: 'SUB003', sub_module_name: 'Password Reset', modules_id: 1 },

      // Product Catalog sub-modules
      { sub_module_id: 'SUB004', sub_module_name: 'Product Search', modules_id: 2 },
      { sub_module_id: 'SUB005', sub_module_name: 'Product Details', modules_id: 2 },
      { sub_module_id: 'SUB006', sub_module_name: 'Product Reviews', modules_id: 2 },

      // Shopping Cart sub-modules
      { sub_module_id: 'SUB007', sub_module_name: 'Add to Cart', modules_id: 3 },
      { sub_module_id: 'SUB008', sub_module_name: 'Update Quantity', modules_id: 3 },
      { sub_module_id: 'SUB009', sub_module_name: 'Remove Items', modules_id: 3 },

      // Payment Gateway sub-modules
      { sub_module_id: 'SUB010', sub_module_name: 'Credit Card Payment', modules_id: 4 },
      { sub_module_id: 'SUB011', sub_module_name: 'PayPal Integration', modules_id: 4 },
      { sub_module_id: 'SUB012', sub_module_name: 'Payment Verification', modules_id: 4 }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sub_module', null, {});
    await queryInterface.bulkDelete('modules', null, {});
    await queryInterface.bulkDelete('project', null, {});
  }
};
