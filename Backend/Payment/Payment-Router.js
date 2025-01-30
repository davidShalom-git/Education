const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router();
const Auth = require('../Auth-Model/Auth');
const authMiddleware = require("../Auth-Middle/Auth-Middle");

const razorpay = new Razorpay({
  key_id: "rzp_test_5fOFzd2Txaz6fT", // Your Razorpay Key ID
  key_secret: "b6RT9foJESy1oHyrFBwKjfmW", // Your Razorpay Secret Key
});

// Create Razorpay order
router.post("/create-order", async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const amountInPaise = amount * 100; // Amount in paise

    const options = {
      amount: amountInPaise,
      currency: currency,
      receipt: `receipt_${new Date().getTime()}`,
      payment_capture: 1, // Automatic capture of payment
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
    res.status(500).json({ success: false, message: error.message });
  }
});

// Check payment status
router.get("/payment-status", authMiddleware, async (req, res) => {
  try {
    const user = await Auth.findById(req.user.id);
    res.json({ isPaid: user?.hasPaidForPDF || false });
  } catch (error) {
    console.error("Error fetching payment status:", error);
    res.status(500).json({ success: false, message: "Error fetching payment status" });
  }
});

// Update payment status after successful payment
router.post("/update-payment", authMiddleware, async (req, res) => {
  try {
    const user = await Auth.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.hasPaidForPDF = true; // Mark user as paid
    await user.save();

    res.json({ success: true, message: "Payment recorded successfully" });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ success: false, message: "Error updating payment status" });
  }
});

module.exports = router;
