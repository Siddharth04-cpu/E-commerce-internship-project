import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import {
  Container,
  Typography,
  Button
} from '@mui/material';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(stored);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const placeOrder = async () => {
    try {
      await API.post('/orders', {
        items: cart,
        totalAmount: total,
        userId: user._id,
      });

      localStorage.removeItem('cart'); // Clear cart
      navigate('/orders'); // Go to order history
    } catch (err) {
      alert('Failed to place order');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Confirm Order</Typography>
      <Typography>Total: ₹{total}</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={placeOrder}
      >
        Place Order
      </Button>
    </Container>
  );
};

export default Checkout;
