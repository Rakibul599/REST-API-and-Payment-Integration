const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true, // Fix typo
    },
    stock: {
      type: Number,
      required: true, // Fix typo
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

if (!req.user || !req.user.userid) {
  return res.status(401).json({ message: "Unauthorized: User not authenticated" });
}

res.status(200).json({ message: "Login jwt generated", token: `Bearer ${token}` });