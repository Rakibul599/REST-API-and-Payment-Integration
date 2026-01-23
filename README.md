# Backend Developer Technical Assignment – REST API & Payment Integration

## Project Overview
This project is a RESTful backend for a simple e-commerce system, built using Node.js and Express.js. It includes user authentication, product management, order creation, and Stripe payment integration. The backend is deployed on Render and supports webhook handling for payment success/failure updates.

## Preferred Tech Stack
- Backend Framework: Node.js with Express.js
- Database: MongoDB
- Payment Gateway: Stripe (test mode preferred)
- Deployment: Render
- Authentication: JWT (JSON Web Token)

## Features
### REST API Development
- User Registration and Login:
  - Register new users with hashed passwords.
  - Login users and generate JWT tokens for authentication.
- User Profile:
  - Retrieve the logged-in user's profile using JWT authentication.
- Product Management:
  - Create and list products.
- Order Management:
  - Create orders and initiate payments.
  - Handle payment success/failure via Stripe webhooks.

### Payment Integration
- Stripe Payment Gateway:
  - Create payment intents for orders.
  - Confirm payments using Stripe webhooks.
- Webhook Handling:
  - Update order status (`paid`, `failed`) based on webhook events.

### Deployment
- Backend deployed on Render.
- Live API base URL and webhook endpoint provided.

## Setup Instructions
1. Clone the Repository:
   ```bash
   git clone https://github.com/Rakibul599/REST-API-and-Payment-Integration
   cd REST-API-and-Payment-Integration
   ```
2. Install Dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file in the root directory and add the following variables:
   ```plaintext
   PORT=3000
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRY=86400000
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   MONGOOSE_CONNECTION_STRING=your_mongo_connection_string
   ```
   Refer to the `.env.example` file for placeholders.
4. Start the Server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`.

## API Endpoints
### User Authentication
1. Register User: `POST /api/registration`
   - Input:
     ```json
     {
       "name": "John Doe",
       "email": "john.doe@example.com",
       "password": "password123"
     }
     ```
   - Output:
     ```json
     {
       "message": "Registration was successfully",
       "data": {
         "name": "John Doe",
         "email": "john.doe@example.com",
         "role": "user"
       }
     }
     ```
2. Login User: `POST /api/login`
   - Input:
     ```json
     {
       "email": "john.doe@example.com",
       "password": "password123"
     }
     ```
   - Output:
     ```json
     {
       "message": "Login jwt generated",
       "token": "Bearer <JWT_TOKEN>"
     }
     ```
3. Get Profile: `GET /api/profile`
   - Headers:
     ```json
     {
       "Authorization": "Bearer <JWT_TOKEN>"
     }
     ```
   - Output:
     ```json
     {
       "message": "user Profile",
       "details": {
         "id": "63c9f1e8f1a4b2d8e8a9c123",
         "name": "John Doe",
         "email": "john.doe@example.com",
         "role": "user"
       }
     }
     ```

### Product Management
1. Create Product: `POST /api/products`
   - Headers:
     ```json
     {
       "Authorization": "Bearer <JWT_TOKEN>"
     }
     ```
   - Input:
     ```json
     {
       "name": "Wireless Mouse",
       "description": "A high-precision wireless mouse.",
       "price": 25.99,
       "currency": "USD",
       "stock": 100
     }
     ```
   - Output:
     ```json
     {
       "message": "Product created",
       "data": {
         "id": "697387b9379bc9c112010ae0",
         "name": "Wireless Mouse",
         "description": "A high-precision wireless mouse.",
         "price": 25.99,
         "currency": "USD",
         "stock": 100
       }
     }
     ```
2. List Products: `GET /api/products`
   - Output:
     ```json
     {
       "message": "Product list",
       "data": [
         {
           "id": "697387b9379bc9c112010ae0",
           "name": "Wireless Mouse",
           "description": "A high-precision wireless mouse.",
           "price": 25.99,
           "currency": "USD",
           "stock": 100
         }
       ]
     }
     ```

### Order Management
1. Create Order: `POST /api/orders/create`
   - Headers:
     ```json
     {
       "Authorization": "Bearer <JWT_TOKEN>"
     }
     ```
   - Input:
     ```json
     {
       "items": [
         { "productId": "697387b9379bc9c112010ae0", "quantity": 2 }
       ]
     }
     ```
   - Output:
     ```json
     {
       "message": "Order created successfully",
       "orderId": "697396324fca24aa3ffaa0ce",
       "clientSecret": "pi_3SsmSMFsQMNGcyoD0pHVdaej_secret_pgKJagrwDApo9H6ubHLwYuidO"
     }
     ```
2. Webhook Endpoint: `POST /api/orders/webhook`
   - Input (Sent by Stripe):
     ```json
     {
       "type": "payment_intent.succeeded",
       "data": {
         "object": {
           "id": "pi_3SsmSMFsQMNGcyoD0pHVdaej",
           "status": "succeeded"
         }
       }
     }
     ```
   - Output:
     ```json
     {
       "received": true
     }
     ```

## Payment Flow
1. Create Order:
   - Call `POST /api/orders/create` to create a payment intent.
   - Receive the `clientSecret` in the response.
2. Confirm Payment:
   - Use Stripe.js or backend confirmation to confirm the payment using the `clientSecret`.
3. Webhook Handling:
   - Stripe triggers the `payment_intent.succeeded` or `payment_intent.payment_failed` event.
   - The webhook endpoint updates the order status in the database.

## Deployment
- Live API Base URL: `https://rest-api-and-payment-integration.onrender.com`
- Webhook Endpoint: `https://rest-api-and-payment-integration.onrender.com/api/orders/webhook`

## Deliverables
1. GitHub Repository: `https://github.com/Rakibul599/REST-API-and-Payment-Integration`
2. Postman Collection: Exported collection with all endpoints.
3. `.env.example` File: Included in the repository.
4. README: This file.
