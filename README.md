# IM Express Example

This project is an example of a Node.js application using Express.js to interact with the Ingram Micro API. It includes functionalities for authentication, order search, product search, and quote search.

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation
1. Clone the repository:
   git clone https://github.com/yourusername/im-express-example.git
   cd im-express-example

2. Install dependencies:
   npm install

3. Create a `.env` file in the project root with these variables:
   API_BASE_URL=https://api.ingrammicro.com/sandbox  
   SESSION_SECRET=your-secret-key  
   IM_CUSTOMERCONTACT=your-customer-contact  
   IM_COUNTRYCODE=your-country-code  
   IM_CUSTOMER_NUMBER=your-customer-number  
   IM_CORRELATION_ID=your-correlation-id  
   IM_SENDERID=your-sender-id  
   PORT=3000  

## Usage
npm start
Visit http://localhost:3000

## API Endpoints
- POST /api/auth  
  Authenticates and returns token

- GET /api/orders/search  
  Searches for orders

- GET /api/orders/:orderNumber  
  Retrieves details of a specific order

- GET /api/products/search  
  Searches for products

- GET /api/quotes/search  
  Searches for quotes

## Dependencies
{
  "axios": "^1.7.9",  
  "dotenv": "^8.2.0",  
  "ejs": "^3.1.5",  
  "express": "^4.17.1",  
  "express-session": "^1.17.1",  
  "json-viewer": "^1.1.0",  
  "simple-update-notifier": "^2.0.0"  
}

### Dev Dependencies
{
  "nodemon": "^3.1.9"
}

## Project Structure
.  
├── src  
│   ├── utils  
│   │   ├── apiClient.js  
│   │   ├── apiGetToken.js  
│   │   ├── orderSearch.js  
│   │   ├── productSearch.js  
│   │   ├── quoteSearch.js  
│   │   └── orderDetail.js  
│   ├── views  
│   │   └── index.ejs  
│   └── index.js  
├── .env  
├── package.json  
└── README.md  

## License
MIT License# IMSnippetJS
