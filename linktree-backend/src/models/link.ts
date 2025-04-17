import { Model, DataTypes, Sequelize, Optional } from 'sequelize';
import { User } from './user'; // Import User class

// Define attributes for the Link model
interface LinkAttributes {
  id?: number;
  userId: number;
  title: string;
  url: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LinkCreationAttributes extends Optional<LinkAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class Link extends Model<LinkAttributes, LinkCreationAttributes> implements LinkAttributes {
  public id!: number;
  public userId!: number;
  public title!: string;
  public url!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: { User: typeof User }) {
    Link.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

export const initializeLinkModel = (sequelize: Sequelize): typeof Link => {
  Link.init(
    {
      userId: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
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
      modelName: 'Link',
      tableName: 'links',
      timestamps: true,
    }
  );

  return Link;
};

