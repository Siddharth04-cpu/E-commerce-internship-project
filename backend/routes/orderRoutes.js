import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// POST /api/orders
router.post('/', async (req, res) => {
  const { items, totalAmount, userId } = req.body;

  if (!items || items.length === 0) return res.status(400).json({ message: 'No items' });

  const order = new Order({
    user: userId,
    items,
    totalAmount
  });

  const created = await order.save();
  res.status(201).json(created);
});

// GET /api/orders/:userId
router.get('/:userId', async (req, res) => {
  const orders = await Order.find({ user: req.params.userId });
  res.json(orders);
});

export default router;
