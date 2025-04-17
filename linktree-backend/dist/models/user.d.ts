import { Model, Sequelize, Optional } from 'sequelize';
import { Link } from './link';
interface UserAttributes {
    id?: number;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    resetToken?: string;
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {
}
export declare class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    resetToken: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: {
        Link: typeof Link;
    }): void;
    /**
     * Helper method to check if a plaintext password matches the hashed password
     */
    checkPassword(plainPassword: string): Promise<boolean>;
}
export declare const initializeUserModel: (sequelize: Sequelize) => typeof User;
export {};
//# sourceMappingURL=user.d.ts.map