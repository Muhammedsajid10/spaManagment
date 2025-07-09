import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../Service/Context';
import { useNavigate } from 'react-router-dom';

export default function OrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const pageRef = useRef();

  useEffect(() => {
    // TODO: Fetch orders from backend using token
    // For now, show placeholder
    setTimeout(() => {
      setOrders([]);
      setLoading(false);
    }, 500);
    if (pageRef.current) {
      pageRef.current.style.opacity = 1;
      pageRef.current.style.transform = 'translateY(0)';
    }
  }, [token]);

  return (
    <div
      ref={pageRef}
      style={{
        maxWidth: 600,
        margin: '40px auto',
        padding: 24,
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        position: 'relative',
        opacity: 0,
        transform: 'translateY(30px)',
        transition: 'opacity 0.5s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.4,0,.2,1)',
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: 18,
          left: 18,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
        }}
        aria-label="Back"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="14" cy="14" r="14" fill="#f5f5f5" />
          <path d="M16.5 9L12.5 14L16.5 19" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <h2 style={{ marginBottom: 24, textAlign: 'center', fontWeight: 700, letterSpacing: 0.5 }}>My Orders</h2>
      {loading ? (
        <div>Loading...</div>
      ) : orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id}>{order.details}</li>
          ))}
        </ul>
      )}
    </div>
  );
} 