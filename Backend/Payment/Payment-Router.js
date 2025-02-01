const express = require("express");
const Razorpay = require("razorpay");
const crypto = require('crypto');
const router = express.Router();
const Auth = require('../Auth-Model/Auth');
const authMiddleware = require("../Auth-Middle/Auth-Middle");
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: "rzp_live_LODynINQB1J1t5",
  key_secret: "EGxyQP6w3T0cv4p8d6II7Yzy"
});

// Create Razorpay order
router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const options = {
      amount: 1000, // Amount in paise (₹50)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);

    if (error.error) {
      // Razorpay-specific error details
      console.error("Razorpay Error Details:", error.error);
      res.status(500).json({ success: false, message: error.error.description });
    } else {
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
});


// Verify payment and update status
router.post("/verify-payment", authMiddleware, async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', "EGxyQP6w3T0cv4p8d6II7Yzy")
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update user payment status
      const user = await Auth.findById(req.user.userID);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      user.hasPaidForPDF = true;
      await user.save();

      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({ success: false, message: "Error verifying payment" });
  }
});

// Check payment status
router.get("/payment-status", authMiddleware, async (req, res) => {
  try {
    const user = await Auth.findById(req.user.userID);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ isPaid: user.hasPaidForPDF || false });
  } catch (error) {
    console.error("Error fetching payment status:", error);
    res.status(500).json({ success: false, message: "Error fetching payment status" });
  }
});

module.exports = router;
