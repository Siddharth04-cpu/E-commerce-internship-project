import express from 'express';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const router = express.Router();

// GET all products
router.get('/products', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// POST new product
router.post('/products', async (req, res) => {
  const product = new Product(req.body);
  const created = await product.save();
  res.status(201).json(created);
});

// PUT update product
router.put('/products/:id', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE product
router.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// GET all orders
router.get('/orders', async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email');
  res.json(orders);
});

export default router;
