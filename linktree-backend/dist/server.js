"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const models_1 = require("./models"); // Ensure models are properly defined and exported
const bcrypt_1 = __importDefault(require("bcrypt"));
const pg_1 = require("pg");
const google_auth_library_1 = require("google-auth-library");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Google OAuth Client Configuration
const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
console.log("Google Client ID:", googleClientId); // Debugging
const googleClient = new google_auth_library_1.OAuth2Client(googleClientId);
// Fetch a user's biography
app.get('/users/:userId/biography', async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await pool.query('SELECT biography FROM users WHERE id = $1', [userId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }
        return res.status(200).json({ biography: result.rows[0].biography });
    }
    catch (error) {
        console.error('Error fetching biography:', error);
        return res.status(500).json({ error: 'Failed to fetch biography.' });
    }
});
// Update a user's biography
app.put('/users/:userId/biography', async (req, res) => {
    const { userId } = req.params;
    const { biography } = req.body;
    if (!biography) {
        return res.status(400).json({ error: 'Biography is required.' });
    }
    try {
        const result = await pool.query('UPDATE users SET biography = $1, "updatedAt" = now() WHERE id = $2 RETURNING biography', [biography, userId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }
        return res.status(200).json({ message: 'Biography updated successfully.', biography: result.rows[0].biography });
    }
    catch (error) {
        console.error('Error updating biography:', error);
        return res.status(500).json({ error: 'Failed to update biography.' });
    }
});
// Route for Google Login
app.post("/auth/google", async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ error: "Token is required." });
    }
    try {
        // Verify the Google token
        if (!googleClientId) {
            return res.status(500).json({ error: "Google Client ID is not configured." });
        }
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: googleClientId, // Make sure this matches your Google OAuth client ID
        });
        const payload = ticket.getPayload();
        if (!payload) {
            return res.status(400).json({ error: "Invalid Google token." });
        }
        const { email, name, sub: googleId } = payload;
        // Check if the email exists
        if (!email) {
            return res.status(400).json({ error: "Google account email is required." });
        }
        // Find the user in the database
        const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        let user;
        if (userResult.rowCount && userResult.rowCount > 0) {
            user = userResult.rows[0];
        }
        else {
            // User does not exist, create a new user
            const newUser = await pool.query("INSERT INTO users (email, username, google_id) VALUES ($1, $2, $3) RETURNING *", [email, name || "GoogleUser", googleId]);
            user = newUser.rows[0];
        }
        // Return success response with user details
        return res.status(200).json({
            success: true,
            id: user.id,
            message: "Google login successful.",
        });
    }
    catch (error) {
        console.error("Error during Google login:", error);
        return res.status(500).json({ error: "Failed to authenticate with Google." });
    }
});
// Reset password route
app.post("/users/reset-password", async (req, res) => {
    const { token, newPassword } = req.body;
    // Validate input
    if (!token || !newPassword) {
        return res.status(400).json({ error: "Token and new password are required." });
    }
    try {
        // Find the user by reset token
        const userResult = await pool.query("SELECT * FROM users WHERE reset_token = $1", [token]);
        if (userResult.rowCount === 0) {
            return res.status(400).json({ error: "Invalid or expired reset token." });
        }
        const user = userResult.rows[0];
        // Hash the new password (replace with bcrypt if needed)
        // const hashedPassword = newPassword; // Use hashing in production (e.g., bcrypt)
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10); // Hash the password
        // Update the user's password and clear the reset token
        await pool.query("UPDATE users SET password = $1, reset_token = NULL WHERE id = $2", [hashedPassword, user.id]);
        return res.status(200).json({ message: "Password reset successful." });
    }
    catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({ error: "Failed to reset password." });
    }
});
/// PUT route to update a link's title or URL
app.put('/links/:id', async (req, res) => {
    console.log(`PUT request received for ID: ${req.params.id}`);
    console.log(`Request body:`, req.body);
    const { id } = req.params; // Get the link ID from the route parameter
    const { title, url } = req.body; // Get title and URL from the request body
    // Validate input
    if (!title && !url) {
        return res.status(400).json({ error: 'At least one of title or URL is required.' });
    }
    try {
        // Build the update query dynamically based on provided fields
        const updateFields = [];
        const values = [];
        let queryIndex = 1;
        if (title) {
            updateFields.push(`title = $${queryIndex++}`);
            values.push(title);
        }
        if (url) {
            updateFields.push(`url = $${queryIndex++}`);
            values.push(url);
        }
        values.push(id); // Add the ID as the last parameter
        // Construct the query
        const query = `
      UPDATE links
      SET ${updateFields.join(', ')}
      WHERE id = $${queryIndex}
      RETURNING *;
    `;
        // Execute the query
        const result = await pool.query(query, values);
        // Check if the link was found and updated
        if (result.rowCount === 0) {
            return res.status(404).json({ error: `Link with ID ${id} not found.` });
        }
        // Return the updated link
        return res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error updating link:', error);
        return res.status(500).json({ error: 'Failed to update link.' });
    }
});
// Configure the PostgreSQL connection
const pool = new pg_1.Pool({
    user: process.env.PG_USER || 'postgres',
    host: process.env.PG_HOST || 'localhost',
    database: process.env.PG_DATABASE || 'linktree',
    password: process.env.PG_PASSWORD || 'IztpgAdmin1',
    port: Number(process.env.PG_PORT) || 5432,
});
// Configure Nodemailer transporter
const gmailTransporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com', // Replace with your email
        pass: process.env.EMAIL_PASS || 'your-app-password', // Replace with your app-specific password
    },
});
// --- Routes ---
// DELETE route to delete a record dynamically by id
app.delete('/links/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM links WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: `Record with ID ${id} not found.` });
        }
        return res.status(200).json({ message: `Record with ID ${id} deleted successfully.` });
    }
    catch (error) {
        console.error('Error deleting record:', error);
        return res.status(500).json({ error: 'Failed to delete record.' });
    }
});
// --- NEW: GET route to fetch a single link by ID ---
app.get('/links/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM links WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: `Link with ID ${id} not found.` });
        }
        return res.status(200).json(result.rows[0]); // Return the link data
    }
    catch (error) {
        console.error('Error fetching link:', error);
        return res.status(500).json({ error: 'Failed to fetch link.' });
    }
});
// Forgot password route
app.post('/users/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        // Find the user by email
        const user = await models_1.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        // Generate a reset token
        const resetToken = Math.random().toString(36).substr(2);
        console.log(`A password 2 reset token has been generated for the email: ${email}. Token: ${resetToken}`);
        // Save the reset token to the database
        try {
            await pool.query('UPDATE users SET reset_token = $1 WHERE email = $2', [resetToken, email]);
            console.log(`Reset token saved to database for user: ${email}`);
        }
        catch (dbError) {
            console.error('Error updating reset token in database:', dbError);
            return res.status(500).json({ error: 'Failed to update reset token in the database.' });
        }
        // Send the email with the reset token
        await gmailTransporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Use the following token to reset your password: ${resetToken}`,
            html: `<p>You requested a password reset. Use the following token to reset your password:</p>
             <p><strong>${resetToken}</strong></p>`,
        });
        return res.status(200).json({ message: 'Password reset link has been sent to your email.' });
    }
    catch (err) {
        console.error('Error handling forgot password request:', err);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});
// Create a new user
app.post('/users', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt_1.default.hash(password, 10); // Hash the password
        const user = await models_1.User.create({ username, email, password: hashedPassword }); // Save user
        res.status(201).json(user);
    }
    catch (err) {
        console.error('Error creating user:', err);
        res.status(400).json({ error: err.message });
    }
});
// Create a new link
app.post('/links', async (req, res) => {
    const { userId, title, url } = req.body;
    try {
        const link = await models_1.Link.create({ userId, title, url }); // Save link
        res.status(201).json(link);
    }
    catch (err) {
        console.error('Error creating link:', err);
        res.status(400).json({ error: err.message });
    }
});
// Get links for a user
app.get('/users/:userId/links', async (req, res) => {
    const { userId } = req.params;
    try {
        const links = await models_1.Link.findAll({ where: { userId } }); // Find links by userId
        res.status(200).json(links);
    }
    catch (err) {
        console.error('Error fetching links:', err);
        res.status(400).json({ error: err.message });
    }
});
// Validate user credentials
app.post('/users/validate', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await models_1.User.findOne({ where: { email } });
        console.log('user:', user);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password); // Compare passwords
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        return res.status(200).json({ id: user.id });
    }
    catch (err) {
        console.error('Error validating user:', err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});
// Handle uncaught routes
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found.' });
});
// Start the server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
//# sourceMappingURL=server.js.map