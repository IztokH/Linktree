"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    async up(queryInterface) {
        await queryInterface.addColumn('users', 'deletedAt', {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true, // This column is null when the record is not soft-deleted
        });
    },
    async down(queryInterface) {
        await queryInterface.removeColumn('users', 'deletedAt');
    },
};
//# sourceMappingURL=20250109205231-add-deleted-at-to-users.js.map