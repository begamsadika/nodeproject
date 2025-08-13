'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert sample releases
    await queryInterface.bulkInsert('release', [
      {
        id: 1,
        release_id: 'REL001',
        release_name: 'Alpha Release',
        releasedate: new Date('2024-01-01'),
        status: true,
        description: 'Initial alpha release for internal testing',
        release_status: 'Alpha',
        project_id: 1,
        release_type_id: 1
      },
      {
        id: 2,
        release_id: 'REL002',
        release_name: 'Beta Release',
        releasedate: new Date('2024-02-01'),
        status: true,
        description: 'Beta release for selected users',
        release_status: 'Beta',
        project_id: 1,
        release_type_id: 2
      },
      {
        id: 3,
        release_id: 'REL003',
        release_name: 'General Availability',
        releasedate: new Date('2024-03-01'),
        status: true,
        description: 'GA release for all users',
        release_status: 'GA',
        project_id: 1,
        release_type_id: 4
      },
      {
        id: 4,
        release_id: 'REL004',
        release_name: 'Hotfix 1',
        releasedate: new Date('2024-04-01'),
        status: false,
        description: 'Critical bug fix for payment gateway',
        release_status: 'Hotfix',
        project_id: 1,
        release_type_id: 5
      },
      {
        id: 5,
        release_id: 'REL005',
        release_name: 'Beta Release 2',
        releasedate: new Date('2024-05-01'),
        status: true,
        description: 'Second beta release for new features',
        release_status: 'Beta',
        project_id: 2,
        release_type_id: 2
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('release', null, {});
  }
};
