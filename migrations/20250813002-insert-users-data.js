'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample users
    await queryInterface.bulkInsert('user', [
      {
        user_id: 'admin001',
        first_name: 'System',
        last_name: 'Administrator',
        email: 'admin@company.com',
        password: '$2b$10$hashedPasswordHere', // In real scenario, use bcrypt
        phone_no: '1234567890',
        join_date: new Date('2024-01-01'),
        user_gender: 'MALE',
        user_status: 'ACTIVE',
        designation_id: 1 // Manager
      },
      {
        user_id: 'dev001',
        first_name: 'John',
        last_name: 'Smith',
        email: 'john.smith@company.com',
        password: '$2b$10$hashedPasswordHere',
        phone_no: '1234567891',
        join_date: new Date('2024-02-01'),
        user_gender: 'MALE',
        user_status: 'ACTIVE',
        designation_id: 1 // Developer
      },
      {
        user_id: 'dev002',
        first_name: 'Sarah',
        last_name: 'Johnson',
        email: 'sarah.johnson@company.com',
        password: '$2b$10$hashedPasswordHere',
        phone_no: '1234567892',
        join_date: new Date('2024-02-15'),
        user_gender: 'FEMALE',
        user_status: 'ACTIVE',
        designation_id: 2 // Senior Developer
      },
      {
        user_id: 'test001',
        first_name: 'Mike',
        last_name: 'Wilson',
        email: 'mike.wilson@company.com',
        password: '$2b$10$hashedPasswordHere',
        phone_no: '1234567893',
        join_date: new Date('2024-03-01'),
        user_gender: 'MALE',
        user_status: 'ACTIVE',
        designation_id: 4 // Tester
      },
      {
        user_id: 'test002',
        first_name: 'Emily',
        last_name: 'Davis',
        email: 'emily.davis@company.com',
        password: '$2b$10$hashedPasswordHere',
        phone_no: '1234567894',
        join_date: new Date('2024-03-15'),
        user_gender: 'FEMALE',
        user_status: 'ACTIVE',
        designation_id: 5 // Senior Tester
      },
      {
        user_id: 'pm001',
        first_name: 'Robert',
        last_name: 'Brown',
        email: 'robert.brown@company.com',
        password: '$2b$10$hashedPasswordHere',
        phone_no: '1234567895',
        join_date: new Date('2024-01-15'),
        user_gender: 'MALE',
        user_status: 'ACTIVE',
        designation_id: 2 // Project Manager
      },
      {
        user_id: 'lead001',
        first_name: 'Lisa',
        last_name: 'Anderson',
        email: 'lisa.anderson@company.com',
        password: '$2b$10$hashedPasswordHere',
        phone_no: '1234567896',
        join_date: new Date('2024-01-20'),
        user_gender: 'FEMALE',
        user_status: 'ACTIVE',
        designation_id: 3 // Lead Developer
      },
      {
        user_id: 'intern001',
        first_name: 'Alex',
        last_name: 'Taylor',
        email: 'alex.taylor@company.com',
        password: '$2b$10$hashedPasswordHere',
        phone_no: '1234567897',
        join_date: new Date('2024-06-01'),
        user_gender: 'MALE',
        user_status: 'ACTIVE',
        designation_id: 2 // Intern
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user', null, {});
  }
};
