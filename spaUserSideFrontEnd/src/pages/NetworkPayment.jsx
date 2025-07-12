import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Service/Context';
import './Payment.css';

const NetworkPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentData, setPaymentData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending');

  // Get booking data from location state or localStorage
  const bookingData = location.state?.bookingData;

  useEffect(() => {
    if (!user || !token) {
      navigate('/login');
      return;
    }

    if (!bookingData || !bookingData.bookingId) {
      console.error('NetworkPayment: No booking data found in location state');
      return;
    }

    // Create payment intent when component mounts
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch('https://spamanagment.onrender.com/api/v1/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bookingId: bookingData.bookingId,
          amount: bookingData.totalAmount,
          currency: 'AED',
          paymentMethod: 'card',
          gateway: 'network_international'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create payment');
      }

      setPaymentData(data.data);
      
      // Check if this is a mock payment (for testing)
      if (data.data.paymentUrl && data.data.paymentUrl.includes('/payment/success')) {
        // This is a mock payment - redirect directly to success
        console.log('Mock payment detected - redirecting to success page');
        window.location.href = data.data.paymentUrl;
      } else if (data.data.paymentUrl) {
        // This is a real Network International payment
        console.log('Real Network International payment - redirecting to payment gateway');
        window.location.href = data.data.paymentUrl;
      } else {
        throw new Error('No payment URL received');
      }

    } catch (error) {
      console.error('Payment creation error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async (paymentId) => {
    try {
      const response = await fetch(`https://spamanagment.onrender.com/api/v1/payments/status/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setPaymentStatus(data.data.status);
        
        if (data.data.status === 'completed') {
          // Payment successful
          navigate('/payment/success', { 
            state: { 
              paymentId,
              amount: bookingData.totalAmount,
              bookingId: bookingData.bookingId
            }
          });
        } else if (data.data.status === 'failed') {
          // Payment failed
          navigate('/payment/failed', { 
            state: { 
              paymentId,
              error: 'Payment failed'
            }
          });
        }
      }
    } catch (error) {
      console.error('Payment status check error:', error);
    }
  };

  const handlePaymentSuccess = () => {
    // This will be called when user returns from Network International
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('paymentId');
    const status = urlParams.get('status');
    const orderId = urlParams.get('orderId');
    const transactionId = urlParams.get('transactionId');

    if (paymentId && status) {
      checkPaymentStatus(paymentId);
    }
  };

  const handlePaymentCancel = () => {
    navigate('/payment/cancel');
  };

  useEffect(() => {
    // Check if this is a return from payment gateway
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('paymentId');
    const status = urlParams.get('status');

    if (paymentId && status) {
      handlePaymentSuccess();
    }
  }, []);

  if (loading) {
    return (
      <div className="payment-container">
        <div className="payment-card">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Creating payment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-container">
        <div className="payment-card">
          <div className="error-message">
            <h2>Payment Error</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/booking')} className="btn-primary">
              Back to Booking
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!bookingData || !bookingData.bookingId) {
    return (
      <div className="payment-container">
        <div className="payment-card">
          <div className="error-message">
            <h2>Booking Data Missing</h2>
            <p>No booking information found. Please complete your booking first.</p>
            <button onClick={() => navigate('/')} className="btn-primary">
              Start Booking
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="payment-header">
          <h2>Network International Payment</h2>
          <p>Secure payment powered by Network International</p>
        </div>

        <div className="payment-details">
          <div className="detail-row">
            <span>Booking ID:</span>
            <span>{bookingData.bookingId}</span>
          </div>
          <div className="detail-row">
            <span>Amount:</span>
            <span>AED {bookingData.totalAmount}</span>
          </div>
          <div className="detail-row">
            <span>Service:</span>
            <span>{bookingData.serviceName}</span>
          </div>
          <div className="detail-row">
            <span>Date:</span>
            <span>{bookingData.date}</span>
          </div>
          <div className="detail-row">
            <span>Time:</span>
            <span>{bookingData.time}</span>
          </div>
        </div>

        <div className="payment-actions">
          <button 
            onClick={createPaymentIntent} 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
          
          <button 
            onClick={handlePaymentCancel} 
            className="btn-secondary"
          >
            Cancel Payment
          </button>
        </div>

        <div className="payment-info">
          <h3>Payment Security</h3>
          <ul>
            <li>🔒 SSL encrypted connection</li>
            <li>🛡️ PCI DSS compliant</li>
            <li>💳 Multiple payment methods</li>
            <li>🌍 UAE & Middle East coverage</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NetworkPayment; 