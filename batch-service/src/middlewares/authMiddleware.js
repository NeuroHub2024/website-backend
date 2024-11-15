const axios = require('axios');

const authUser = async (req, res, next) => {
    console.log('Request headers : ')
    console.log(req.headers)
    console.log('Response headers : ')
    console.log(res.headers)
    // const token = req.body.token;
    const authorization = req.headers['authorization'];
    console.log('authorizaton : ' + authorization)
    let token = ''
    if(authorization) {
        token = authorization.split(' ')[1]
    }
    console.log('token = ' + token)

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
        // const response = await axios.post('https://gateway-mpfy.onrender.com/user/authenticate', {}, { headers });
        const response = await axios.post('https://gateway-mpfy.onrender.com/user/authenticate', {token: token}, { headers });
        
        if (response.data) {
            req.userData = response.data;
            return next();
        } else {
            console.log('No data in response from authentication service');
            res.clearCookie('token'); 
            return res.status(402).json({ message: 'User is Unauthenticated. Please try again after Login' });
        }
    } catch (err) {
        console.log('Error during authentication:', err.message);
        console.log(err)
        res.clearCookie('token');
        return res.status(403).json({ message: 'User is Unauthenticated. Please try again after Login' });
    }
};

module.exports = { authUser };
