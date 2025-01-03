const { getData } = require('./apiClient');

const orderSearch = async (req, res) => {
    try {
        const data = await getData('resellers/v6/orders/search', req);
        res.json(data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.response ? error.response.data : 'Error fetching orders' });
    }
};

module.exports = {
    orderSearch
};