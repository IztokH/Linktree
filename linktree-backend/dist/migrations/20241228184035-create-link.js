"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    async up(queryInterface) {
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
    async down(queryInterface) {
        await queryInterface.dropTable('Links');
    },
};
//# sourceMappingURL=20241228184035-create-link.js.map