// 1. Import Express
import express from 'express';
import swagger from 'swagger-ui-express';

import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import bodyParser from 'body-parser';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cart/cartItems.routes.js';
import apiDocs from './swagger.json' assert { type: 'json' };

// 2. Create a Server
const server = express();

server.use(bodyParser.json());

// for all requests related to product, redirect to product routes
// swaggerUI
server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
// localhost:3200/api/products
server.use('/api/products', jwtAuth, productRouter);
// localhost:3200/api/users
server.use('/api/users', userRouter);
// localhost:3200/api/cart
server.use('/api/cart', jwtAuth, cartRouter);

// 3. Defualt request handler
server.get('/', (req, res) => {
  res.send('Welcome to Ecommerce APIs');
});

// 4. Middleware to handle 404 requests
server.use((req, res) => {
  res.status(404).send("API not found")
})

// 5. Specify Port.
const PORT = 3200;
server.listen(PORT);
console.log('Server is running at', PORT);
