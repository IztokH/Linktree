"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    async up(queryInterface) {
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
    async down(queryInterface) {
        await queryInterface.removeColumn('users', 'createdAt');
        await queryInterface.removeColumn('users', 'updatedAt');
    },
};
//# sourceMappingURL=20250101145437-add-timestamps-to-users.js.map