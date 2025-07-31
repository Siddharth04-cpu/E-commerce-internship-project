import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setUser(null);
    navigate('/login');
  };

  const linkStyle = {
    color: '#ffd166',
    textDecoration: 'none',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    transition: 'background-color 0.2s, color 0.2s',
    fontWeight: 600,
    cursor: 'pointer',
  };

  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = '#ffb627';
    e.target.style.color = '#423089';
  };
  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.color = '#ffd166';
  };

  return (
    <nav
      style={{
        padding: '1rem 2rem',
        backgroundColor: '#423089',
        color: '#fff',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        fontWeight: '600',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Brand */}
      <Link
        to="/"
        style={{ ...linkStyle, fontWeight: '900', fontSize: '1.5rem', padding: '0.4rem 1rem' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Shopping Spree
      </Link>

      {/* Navigation Links */}
      <Link to="/" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        Home
      </Link>
      <Link to="/cart" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        Cart
      </Link>

      {/* User Links or Auth */}
      {user ? (
        <>
          <Link to="/orders" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            My Orders
          </Link>
          <span style={{ marginLeft: 'auto', color: '#ffd166', fontWeight: '700', userSelect: 'none' }}>
            Hello, {user.name}
          </span>
          <button
            onClick={logout}
            style={{
              backgroundColor: '#ffd166',
              border: 'none',
              borderRadius: '6px',
              padding: '0.4rem 1rem',
              cursor: 'pointer',
              fontWeight: '700',
              color: '#423089',
              marginLeft: '1rem',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#ffb627')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#ffd166')}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            Login
          </Link>
          <Link to="/register" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
