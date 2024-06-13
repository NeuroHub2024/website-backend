const jwt = require('jsonwebtoken');
const User = require('../database/models/User'); // Import your Mongoose User model

async function updatePassword(username, newPassword) {
    try {
        // Find the user by username and update their password
        const updatedUser = await User.findOneAndUpdate({ username: username }, { password: newPassword });
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return { success: true, message: 'Password updated successfully' };
    } catch (err) {
        throw new Error('Failed to update password');
    }
}
module.exports= updatePassword;