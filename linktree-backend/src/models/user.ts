import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import bcrypt from 'bcrypt';
import { Link } from './link'; // Import the Link model class

// Define attributes for the User model
interface UserAttributes {
  id?: number; // Optional because it's auto-incremented
  username: string;
  email: string;
  password: string;
  createdAt?: Date; // Optional because Sequelize sets it automatically
  updatedAt?: Date; // Optional because Sequelize sets it automatically
  resetToken?: string; // ResetToken field
}

// Define the attributes required for creating a new User
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public resetToken!: string;  

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: { Link: typeof Link }) {
    User.hasMany(models.Link, { foreignKey: 'userId', as: 'links' });
  }

  /**
   * Helper method to check if a plaintext password matches the hashed password
   */
  public async checkPassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.password); // Compare using bcrypt
  }
}

export const initializeUserModel = (sequelize: Sequelize): typeof User => {
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 50], // Ensure username length is between 3 and 50 characters
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure unique email addresses
        validate: {
          isEmail: true, // Validate email format
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 100], // Ensure password is at least 8 characters
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false, // Sequelize automatically expects camelCase here
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false, // Sequelize automatically expects camelCase here
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users', // Explicitly set the table name
      timestamps: true, // Enable `createdAt` and `updatedAt`
      paranoid: false, // Enable soft deletes by adding `deletedAt` column
      hooks: {
        /**
         * Hash the password before creating a new user
         */
        beforeCreate: async (user: User) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10); // Hash password with bcrypt (10 salt rounds)
          }
        },
        /**
         * Hash the password before updating an existing user
         */
        beforeUpdate: async (user: User) => {
          if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, 10); // Hash updated password
          }
        },
      },
    }
  );

  return User;
};
