const { getData } = require('./apiClient');

const orderDetail = async (req, res) => {
        const { orderNumber } = req.params;
        try {
            const headers = {
                'IM-CustomerNumber': '20-222222', // Here exception for test, only the 20-222222 customer can access this endpoint
                'IM-CountryCode': 'US',
                'Authorization': `${req.session.token}`
            };
            const data = await getData(`resellers/v6.1/orders/${orderNumber}`, req);
            res.json(data);
        } catch (error) {
            res.status(error.response ? error.response.status : 500).json({ error: error.response ? error.response.data : 'Error fetching order' });
        }
};

module.exports = {
    orderDetail
};