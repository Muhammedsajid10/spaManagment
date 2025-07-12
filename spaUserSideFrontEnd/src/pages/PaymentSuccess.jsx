import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Service/Context';
import { bookingFlow } from '../services/api';
import './Payment.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [bookingDetails, setBookingDetails] = useState(null);

  const paymentData = location.state || {};

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Get booking details from localStorage
    const bookingData = JSON.parse(localStorage.getItem('currentBooking') || '{}');
    setBookingDetails(bookingData);

    // Clear booking data from localStorage and booking flow
    localStorage.removeItem('currentBooking');
    bookingFlow.reset();
    
    console.log('Payment success - cleared booking data');
  }, []);

  const handleViewBookings = () => {
    navigate('/dashboard');
  };

  const handleNewBooking = () => {
    navigate('/');
  };

  return (
    <div className="payment-container">
      <div className="payment-card success-card">
        <div className="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22,4 12,14.01 9,11.01"></polyline>
          </svg>
        </div>

        <div className="success-content">
          <h1>Payment Successful!</h1>
          <p>Your payment has been processed successfully.</p>
          
          <div className="payment-summary">
            <h3>Payment Summary</h3>
            <div className="summary-details">
              <div className="detail-row">
                <span>Payment ID:</span>
                <span>{paymentData.paymentId || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>Amount:</span>
                <span>AED {paymentData.amount || bookingDetails?.totalAmount}</span>
              </div>
              <div className="detail-row">
                <span>Booking ID:</span>
                <span>{paymentData.bookingId || bookingDetails?.bookingId}</span>
              </div>
              <div className="detail-row">
                <span>Booking Number:</span>
                <span>{bookingDetails?.bookingNumber || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <span>Services:</span>
                <span>{bookingDetails?.serviceNames}</span>
              </div>
              <div className="detail-row">
                <span>Professional:</span>
                <span>{bookingDetails?.professionalName}</span>
              </div>
              <div className="detail-row">
                <span>Date:</span>
                <span>{bookingDetails?.date}</span>
              </div>
              <div className="detail-row">
                <span>Time:</span>
                <span>{bookingDetails?.time}</span>
              </div>
            </div>
          </div>

          <div className="success-message">
            <h3>What's Next?</h3>
            <ul>
              <li>✅ You will receive a confirmation email shortly</li>
              <li>📅 Your appointment is confirmed</li>
              <li>📱 You can view your bookings in your dashboard</li>
              <li>🔄 You can modify or cancel your booking up to 24 hours before</li>
            </ul>
          </div>

          <div className="action-buttons">
            <button onClick={handleViewBookings} className="btn-primary">
              View My Bookings
            </button>
            <button onClick={handleNewBooking} className="btn-secondary">
              Book Another Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 