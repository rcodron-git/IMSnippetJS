const { getData } = require('./apiClient');

const productSearch = async (req, res) => {
    try {
        const data = await getData('resellers/v6/catalog', req);
        res.json(data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.response ? error.response.data : 'Error fetching orders' });
    }
};

module.exports = {
    productSearch
};