const http = require('http');
const url = require('url');
const { addItemToCart, viewCart } = require('./cart');
const initialItems = require('./data');

// Initialize availableItems directly with initialItems
const availableItems = [...initialItems];
let cart = [];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    // Handling CORS - Allowing requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (path === '/addItemToCart' && req.method === "POST") {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const { name, price, quantity } = JSON.parse(body);
            addItemToCart(name, parseFloat(price), parseInt(quantity));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Item Added successfully', cart }));
        });
    } else if (path === '/viewCart' && req.method === 'GET') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(viewCart()));
    }
});

const port = 3000;

server.listen(port, () => {
    console.log('Server listening on port', port);
});
