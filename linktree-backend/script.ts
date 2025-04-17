import bcrypt from 'bcrypt';
import { User } from './models'; // Adjust the path to your models

const hashExistingPasswords = async () => {
  try {
    // Fetch all users
    const users = await User.findAll();

    for (const user of users) {
      // Check if the password is already hashed (optional)
      if (user.password && user.password.length < 60) {
        // Hash the plain-text password
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Update the user's password in the database
        await User.update(
          { password: hashedPassword },
          { where: { id: user.id } }
        );
      }
    }

    console.log('All passwords have been hashed.');
  } catch (err) {
    console.error('Error hashing passwords:', err);
  }
};

hashExistingPasswords();
