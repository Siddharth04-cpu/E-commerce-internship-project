import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    API.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  return (
    <main style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '0.2rem', color: '#333' }}>
          Welcome to Shopping Spree
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          A Place Where Your Shopping Dreams Turn Into Reality
        </p>
        <p style={{ marginTop: '1rem', fontSize: '1rem', color: '#444' }}>
          {user ? (
            <>Logged in as <strong>{user.name}</strong></>
          ) : (
            <>Please <Link to="/login" style={{ color: '#007bff' }}>login</Link> or <Link to="/register" style={{ color: '#007bff' }}>register</Link>.</>
          )}
        </p>
      </header>

      <section
        aria-label="Products"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {products.map(({ _id, name, image, price }) => (
          <article
            key={_id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '12px',
              padding: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'box-shadow 0.3s, transform 0.3s',
              backgroundColor: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            tabIndex={0} // keyboard focusable for accessibility
            onFocus={e => e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)'}
            onBlur={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
              e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <img
              src={image}
              alt={name}
              width="180"
              height="180"
              style={{
                objectFit: 'cover',
                borderRadius: '10px',
                marginBottom: '1rem',
                transition: 'transform 0.3s',
              }}
              loading="lazy"
            />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#222' }}>{name}</h3>
            <p style={{ fontWeight: '700', marginBottom: '1rem', color: '#555' }}>₹{price}</p>
            <Link
              to={`/product/${_id}`}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#007bff',
                color: '#fff',
                borderRadius: '6px',
                textDecoration: 'none',
                fontWeight: '600',
              }}
              aria-label={`View details for ${name}`}
            >
              View
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Home;
