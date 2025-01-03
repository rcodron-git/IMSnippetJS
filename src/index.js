require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { getData, postData } = require('./utils/apiClient');
const { getToken } = require('./utils/apiGetToken');
const { orderSearch } = require('./utils/orderSearch');
const { productSearch } = require('./utils/productSearch');
const { quoteSearch } = require('./utils/quoteSearch');
const { orderDetail } = require('./utils/orderDetail');
const app = express();
const port = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Middleware
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/api/auth', getToken, (req, res) => {
    res.json({ token: req.session.token });
});

app.get('/api/action', async (req, res) => {
    try {
        const data = await getData('/some-endpoint', req); // Replace with your API endpoint
        res.json(data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({ error: error.response ? error.response.data : 'Error performing action' });
    }
});
app.get('/api/orders/search', orderSearch);
app.get('/api/products/search', productSearch);
app.get('/api/quotes/search', quoteSearch);

app.get('/api/orders/:orderNumber', orderDetail);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});