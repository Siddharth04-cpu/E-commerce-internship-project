import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const addToCart = () => {
    const existing = JSON.parse(localStorage.getItem('cart')) || [];

    const already = existing.find((item) => item._id === product._id);
    let updatedCart;

    if (already) {
      updatedCart = existing.map((item) =>
        item._id === product._id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updatedCart = [...existing, { ...product, qty: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Item added to cart');
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} width="200" />
      <p>{product.description}</p>
      <p>₹{product.price}</p>
      <p>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
      {product.countInStock > 0 && <button onClick={addToCart}>Add to Cart</button>}
    </div>
  );
};

export default ProductDetails;
