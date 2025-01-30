const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRoutes = require("./Auth-Routers/Auth-Routers");
const payRoutes = require("./Payment/Payment-Router");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/pay", payRoutes);

const PORT = process.env.PORT || 1300;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
