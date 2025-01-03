const axios = require('axios');

const apiClient = axios.create({
    baseURL: process.env.API_BASE_URL, // Use the API base URL from the .env file
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Axios',
        'Accept': '*/*',
        'Cache-Control': 'no-cache',
        'Host': 'api.ingrammicro.com', // Corrected Host header
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
    }
});

// Add a request interceptor to set the Authorization header dynamically
apiClient.interceptors.request.use(
    (config) => {
        const token = config.headers['Authorization'];
        if (!token) {
            return Promise.reject({ response: { status: 401, data: { error: 'Authorization token is missing' } } });
        }
        config.headers['Authorization'] = `Bearer ${token}`;
        config.headers['IM-CountryCode'] = process.env.IM_COUNTRYCODE; // Use the country code from the .env file
        config.headers['IM-CustomerNumber'] = process.env.IM_CUSTOMER_NUMBER;
        config.headers['IM-CorrelationID'] = process.env.IM_CORRELATION_ID
        config.headers['IM-SenderID'] = process.env.IM_SENDERID // Use the customer number from the .env file
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const getData = async (endpoint, req, additionalHeaders = {}) => {
    try {
        const response = await apiClient.get(endpoint, {
            headers: {
                ...additionalHeaders,
                'Authorization': `${req.session.token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const postData = async (endpoint, data, req) => {
    try {
        const response = await apiClient.post(endpoint, data, {
            headers: {
                'Authorization': `Bearer ${req.session.token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

module.exports = {
    getData,
    postData
};