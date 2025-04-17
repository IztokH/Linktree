"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("./models"); // Adjust the path to your models
const hashExistingPasswords = async () => {
    try {
        // Fetch all users
        const users = await models_1.User.findAll();
        for (const user of users) {
            // Check if the password is already hashed (optional)
            if (user.password && user.password.length < 60) {
                // Hash the plain-text password
                const hashedPassword = await bcrypt_1.default.hash(user.password, 10);
                // Update the user's password in the database
                await models_1.User.update({ password: hashedPassword }, { where: { id: user.id } });
            }
        }
        console.log('All passwords have been hashed.');
    }
    catch (err) {
        console.error('Error hashing passwords:', err);
    }
};
hashExistingPasswords();
//# sourceMappingURL=script.js.map