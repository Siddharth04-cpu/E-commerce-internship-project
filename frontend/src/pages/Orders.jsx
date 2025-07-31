import { useEffect, useState } from 'react';
import API from '../api';
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  Divider
} from '@mui/material';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    API.get(`/orders/${user._id}`).then((res) => setOrders(res.data));
  }, [user._id]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Order History</Typography>

      {orders.length === 0 ? (
        <Typography>No orders yet.</Typography>
      ) : (
        orders.map((order) => (
          <Card key={order._id} sx={{ my: 2 }}>
            <CardContent>
              <Typography variant="h6">Order #{order._id.slice(-6)}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Total: ₹{order.totalAmount}
              </Typography>
              <List>
                {order.items.map((item) => (
                  <ListItem key={item._id}>
                    {item.name} x {item.qty} = ₹{item.qty * item.price}
                  </ListItem>
                ))}
              </List>
              <Divider />
              <Typography variant="caption">
                Ordered on: {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default Orders;
