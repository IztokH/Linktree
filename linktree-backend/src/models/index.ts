import path from 'path';
import { Sequelize} from 'sequelize';
import process from 'process';
import { initializeUserModel, User } from './user';
import { initializeLinkModel, Link } from './link';

// Initialize Sequelize instance
const env = process.env.NODE_ENV || 'development';
const config = require(path.resolve(__dirname, '../config/config.js'))[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'postgres',
  }
);

// Initialize models
initializeUserModel(sequelize);
initializeLinkModel(sequelize);

// Export models and Sequelize instance
export const models = {
  User,
  Link,
};

export { sequelize, User, Link }; // Explicitly export User and Link
export default models;
