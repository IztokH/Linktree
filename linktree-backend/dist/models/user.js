"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeUserModel = exports.User = void 0;
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sequelize_1.Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        User.hasMany(models.Link, { foreignKey: 'userId', as: 'links' });
    }
    /**
     * Helper method to check if a plaintext password matches the hashed password
     */
    async checkPassword(plainPassword) {
        return bcrypt_1.default.compare(plainPassword, this.password); // Compare using bcrypt
    }
}
exports.User = User;
const initializeUserModel = (sequelize) => {
    User.init({
        username: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 50], // Ensure username length is between 3 and 50 characters
            },
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true, // Ensure unique email addresses
            validate: {
                isEmail: true, // Validate email format
            },
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 100], // Ensure password is at least 8 characters
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
        modelName: 'User',
        tableName: 'users', // Explicitly set the table name
        timestamps: true, // Enable `createdAt` and `updatedAt`
        paranoid: false, // Enable soft deletes by adding `deletedAt` column
        hooks: {
            /**
             * Hash the password before creating a new user
             */
            beforeCreate: async (user) => {
                if (user.password) {
                    user.password = await bcrypt_1.default.hash(user.password, 10); // Hash password with bcrypt (10 salt rounds)
                }
            },
            /**
             * Hash the password before updating an existing user
             */
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    user.password = await bcrypt_1.default.hash(user.password, 10); // Hash updated password
                }
            },
        },
    });
    return User;
};
exports.initializeUserModel = initializeUserModel;
//# sourceMappingURL=user.js.map