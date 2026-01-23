const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); 
const Order = require("../model/Order");
const Product = require("../model/Product");

// Create a new order and initiate payment
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body; 
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in the order" });
    }

    // Calculate total amount
    let totalAmount = 0;
    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }
      totalAmount += product.price * item.quantity;
      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
      });
    }

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, 
      currency: "usd",
      metadata: { userId: req.user.userid },
    });

    // Create an order in the database
    const order = new Order({
      user: req.user.userid,
      items: orderItems,
      amount: totalAmount,
      currency: "USD",
      paymentIntentId: paymentIntent.id,
      status: "pending",
    });
    await order.save();

    res.status(201).json({
      message: "Order created successfully",
      orderId: order._id,
      clientSecret: paymentIntent.client_secret, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Handle Stripe webhook for payment status updates
exports.handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET 
    );
  } catch (err) {
    console.error(err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;

      // Update order status to 'paid'
      await Order.findOneAndUpdate(
        { paymentIntentId: paymentIntent.id },
        { status: "paid" }
      );
      console.log("Payment succeeded:", paymentIntent.id);
      break;

    case "payment_intent.payment_failed":
      const failedIntent = event.data.object;

      // Update order status to 'failed'
      await Order.findOneAndUpdate(
        { paymentIntentId: failedIntent.id },
        { status: "failed" }
      );
      console.log("Payment failed:", failedIntent.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};