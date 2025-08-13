'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample smtp_config data
    await queryInterface.bulkInsert('smtp_config', [
      {
        id: 1,
        from_email: 'noreply@example.com',
        from_name: 'No Reply',
        name: 'Default SMTP',
        password: 'smtp_password_1',
        smtp_host: 'smtp.example.com',
        smtp_port: '587',
        username: 'smtpuser1'
      },
      {
        id: 2,
        from_email: 'support@example.com',
        from_name: 'Support',
        name: 'Support SMTP',
        password: 'smtp_password_2',
        smtp_host: 'smtp.example.com',
        smtp_port: '465',
        username: 'smtpuser2'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('smtp_config', null, {});
  }
};
