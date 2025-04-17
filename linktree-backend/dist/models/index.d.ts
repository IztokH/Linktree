import { Sequelize } from 'sequelize';
import { User } from './user';
import { Link } from './link';
declare const sequelize: Sequelize;
export declare const models: {
    User: typeof User;
    Link: typeof Link;
};
export { sequelize, User, Link };
export default models;
//# sourceMappingURL=index.d.ts.map