import { Model, Sequelize, Optional } from 'sequelize';
import { User } from './user';
interface LinkAttributes {
    id?: number;
    userId: number;
    title: string;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
}
interface LinkCreationAttributes extends Optional<LinkAttributes, 'id' | 'createdAt' | 'updatedAt'> {
}
export declare class Link extends Model<LinkAttributes, LinkCreationAttributes> implements LinkAttributes {
    id: number;
    userId: number;
    title: string;
    url: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    static associate(models: {
        User: typeof User;
    }): void;
}
export declare const initializeLinkModel: (sequelize: Sequelize) => typeof Link;
export {};
//# sourceMappingURL=link.d.ts.map