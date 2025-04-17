"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeLinkModel = exports.Link = void 0;
const sequelize_1 = require("sequelize");
class Link extends sequelize_1.Model {
    static associate(models) {
        Link.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
}
exports.Link = Link;
const initializeLinkModel = (sequelize) => {
    Link.init({
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id', // Map `userId` to the database column `user_id`
            references: {
                model: 'users', // Table name for the user model
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false, // Sequelize automatically expects camelCase here
            defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false, // Sequelize automatically expects camelCase here
            defaultValue: sequelize_1.Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        sequelize,
        modelName: 'Link',
        tableName: 'links',
        timestamps: true,
    });
    return Link;
};
exports.initializeLinkModel = initializeLinkModel;
//# sourceMappingURL=link.js.map