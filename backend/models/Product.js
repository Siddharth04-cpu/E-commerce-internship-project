import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  countInStock: Number,
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
