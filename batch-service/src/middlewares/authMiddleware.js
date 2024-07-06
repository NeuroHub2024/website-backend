const axios = require('axios');

const authUser = async (req, res, next) => {
    const token = req.body.token;
    console.log(token)

    if (!token) {
        console.log('No token found in cookies');
        return res.status(401).json({ message: 'User unauthenticated' });
    }

    const headers = {
        'Cookie': `token=${token}`,
        'Content-Type': 'application/json',
    };

    try {
        // Sending the token in the headers
        const response = await axios.post('https://gateway-mpfy.onrender.com/user/authenticate', {}, { headers });
        // const response = await axios.post('https://gateway-mpfy.onrender.com/user/authenticate', {token: token}, { headers });
        
        if (response.data) {
            req.userData = response.data;
            return next();
        } else {
            console.log('No data in response from authentication service');
            res.clearCookie('token'); 
            return res.status(402).json({ message: 'User unauthenticated' });
        }
    } catch (err) {
        console.log('Error during authentication:', err.message);
        console.log(err)
        res.clearCookie('token');
        return res.status(403).json({ message: 'User unauthenticated' });
    }
};

module.exports = { authUser };
