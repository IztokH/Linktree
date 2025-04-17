"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = exports.User = exports.sequelize = exports.models = void 0;
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const process_1 = __importDefault(require("process"));
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const link_1 = require("./link");
Object.defineProperty(exports, "Link", { enumerable: true, get: function () { return link_1.Link; } });
// Initialize Sequelize instance
const env = process_1.default.env.NODE_ENV || 'development';
const config = require(path_1.default.resolve(__dirname, '../config/config.js'))[env];
const sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'postgres',
});
exports.sequelize = sequelize;
// Initialize models
(0, user_1.initializeUserModel)(sequelize);
(0, link_1.initializeLinkModel)(sequelize);
// Export models and Sequelize instance
exports.models = {
    User: user_1.User,
    Link: link_1.Link,
};
exports.default = exports.models;
//# sourceMappingURL=index.js.map