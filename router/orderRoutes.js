const express = require("express");
const { createOrder, handleWebhook } = require("../controller/orderController");
const auth = require("../middleware/auth");
const router = express.Router();

// Create order and initiate payment
router.post("/create", auth, createOrder);

// Stripe webhook endpoint
router.post("/webhook", express.raw({ type: "application/json" }), handleWebhook);

module.exports = router;