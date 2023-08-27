const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// WooCommerce API credentials

const consumerKey = 'ck_bcc829bb7da7954f7487748a9963e966cef16c71';
const consumerSecret = 'cs_0e50ba69c14687741ff1252295d26eb70368e94d';
// WooCommerce API base URL

const baseUrl = 'https://ninjashop.in/wp-json/wc/v3';

// Endpoint to list orders within a specified date range
app.get('/list-orders', async (req, res) => {
    try {
        const page = req.query.page || 1; 
        const perPage = 5; 
            // Make a GET request to the WooCommerce API to fetch orders
             const response = await axios.get(`${baseUrl}/orders`, {
            auth: {
                username: consumerKey,
                password: consumerSecret
            },
            params: {
                after: '2022-12-12T00:00:00',
                before: '2022-12-29T23:59:59',
                per_page: perPage,
                page: page,
                orderby: 'date',
                order: 'asc'
            }
        });
        
        const orders = response.data;
        
        // Log the orders in the console
        console.log(orders);
        
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});
// Start the Express server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
