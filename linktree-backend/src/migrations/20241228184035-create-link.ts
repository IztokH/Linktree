import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: 'INTEGER',
      },
      userId: {
        type: 'INTEGER',
        allowNull: false,
      },
      title: {
        type: 'STRING',
        allowNull: false,
      },
      url: {
        type: 'STRING',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: 'DATE',
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: 'DATE',
        defaultValue: new Date(),
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Links');
  },
};
