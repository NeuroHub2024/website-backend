const axios = require('axios');

const authUser = async (req, res, next) => {
    const token = req.cookies.token;
    const role = req.cookies.role;
    console.log(token)

    if (!token) {
        console.log('No token found in cookies');
        return res.status(401).json({ message: 'User unauthenticated' });
    }

    const headers = {
        'Cookie': `token=${token};role=${role}`,
        'Content-Type': 'application/json',
    };

    try {
        // Sending the token in the headers
        const response = await axios.post('http://localhost:5000/user/authenticate', {}, { headers });
        console.log(response)
        
        if (response.data) {
            req.userData = response.data;
            return next();
        } else {
            console.log('No data in response from authentication service');
            res.clearCookie('token'); 
            return res.status(401).json({ message: 'User unauthenticated' });
        }
    } catch (err) {
        console.log('Error during authentication:', err.message);
        res.clearCookie('token');
        return res.status(401).json({ message: 'User unauthenticated' });
    }
};

module.exports = { authUser };
