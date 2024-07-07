const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['deposit', 'withdraw'], required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
