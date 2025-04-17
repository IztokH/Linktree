import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    // Check if 'createdAt' column exists before adding it
    const tableDescription = await queryInterface.describeTable('users');

    if (!tableDescription.createdAt) {
      await queryInterface.addColumn('users', 'createdAt', {
        allowNull: false,
        type: 'DATE',
        defaultValue: new Date(),
      });
    }

    if (!tableDescription.updatedAt) {
      await queryInterface.addColumn('users', 'updatedAt', {
        allowNull: false,
        type: 'DATE',
        defaultValue: new Date(),
      });
    }
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('users', 'createdAt');
    await queryInterface.removeColumn('users', 'updatedAt');
  },
};
