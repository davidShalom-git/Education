const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  Name: { type: String, required: true, unique: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true, unique: true },
  hasPaidForPDF: { type: Boolean, default: false }
});

module.exports = mongoose.model('Auth', authSchema);
