const express = require("express");
const Razorpay = require("razorpay");
const router = express.Router()

const razorpay = new Razorpay({
  key_id: "rzp_test_5fOFzd2Txaz6fT", // Replace with your Razorpay Key ID
  key_secret: "b6RT9foJESy1oHyrFBwKjfmW", // Replace with your Razorpay Secret Key
});


router.post("/create-order", async (req, res) => {
  const { amount, currency } = req.body;

  try {
    // Razorpay expects the amount in paise (1 INR = 100 paise)
    const amountInPaise = amount * 100;

    const options = {
      amount: amountInPaise,  // Amount in paise
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


module.exports = router;

