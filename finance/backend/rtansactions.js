const express = require('express');
const Transaction = require('mtransaction');
const User = require('muser');

const router = express.Router();

// Deposit
router.post('/deposit', async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    user.balance += amount;
    await user.save();
    const transaction = new Transaction({ userId, amount, type: 'deposit' });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Withdraw
router.post('/withdraw', async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    user.balance -= amount;
    await user.save();
    const transaction = new Transaction({ userId, amount, type: 'withdraw' });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Transaction History
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.find({ userId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
