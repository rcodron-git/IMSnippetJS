const { getData } = require('./apiClient');

const quoteSearch = async (req, res) => {
    try {
        const headers = {
            'IM-CustomerNumber': '20-222222', // Here exception for test, only the 20-222222 customer can access this endpoint
            'IM-CustomerContact': process.env.IM_CUSTOMERCONTACT, // Add your new header here
            'Authorization': `${req.session.token}`

        };
        const data = await getData('resellers/v6/quotes/search', req, headers);
        res.json(data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.response ? error.response.data : 'Error fetching quotes' });
    }
};

module.exports = {
    quoteSearch
};