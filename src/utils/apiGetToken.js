const axios = require('axios');
const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

const getToken = async (req, res, next) => {
    try {
        const data = new URLSearchParams({
            grant_type: 'client_credentials',
            scope: 'write read',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET
        });

        const response = await axios.post(process.env.AUTH_URL, data.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Axios',
                'Accept': '*/*',
                'Cache-Control': 'no-cache',
                'Host': 'api.ingrammicro.com', // Corrected Host header
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Content-Length': data.toString().length
            }
        });

        console.log('Token:', response.data.access_token);
        req.session.token = response.data.access_token;
        next();
    } catch (error) {
        if (error.response) {
            console.error('Response Error:', error.response.data);
            res.status(error.response.status).json({ error: 'Authentication failed', details: error.response.data });
        } else if (error.request) {
            console.error('Request Error:', error.request);
            res.status(500).json({ error: 'No response received from the third-party API.' });
        } else {
            console.error('Unexpected Error:', error.message);
            res.status(500).json({ error: 'Authentication failed', details: error.message });
        }
    }
};

module.exports = {
    getToken
};