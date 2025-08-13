'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'designation_id', {
      type: Sequelize.BIGINT,
      allowNull: true,
      references: {
        model: 'designation',
        key: 'id'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user', 'designation_id');
  }
};
