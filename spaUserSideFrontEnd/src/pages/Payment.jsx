import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Service/Context';
import { bookingFlow } from '../services/api';
import './Payment.css';

const Payment = () => {
  console.log('Payment component: Starting to render');
  
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableGateways, setAvailableGateways] = useState([]);
  const [selectedGateway, setSelectedGateway] = useState('network_international');

  // Get booking data from localStorage
  const bookingData = JSON.parse(localStorage.getItem('bookingData') || '{}');
  
  // Create booking data from available booking flow data
  const createBookingData = () => {
    // Load booking flow data
    bookingFlow.load();
    
    console.log('Payment component: BookingFlow data:', {
      selectedServices: bookingFlow.selectedServices,
      selectedProfessionals: bookingFlow.selectedProfessionals,
      selectedTimeSlot: bookingFlow.selectedTimeSlot
    });
    
    console.log('Payment component: Full bookingFlow object:', bookingFlow);
    console.log('Payment component: localStorage booking data:', localStorage.getItem('bookingData'));
    
    if (bookingFlow.selectedServices && bookingFlow.selectedServices.length > 0 && 
        bookingFlow.selectedProfessionals && Object.keys(bookingFlow.selectedProfessionals).length > 0 && 
        bookingFlow.selectedTimeSlot) {
      
      const totalPrice = bookingFlow.getTotalPrice();
      const totalDuration = bookingFlow.getTotalDuration();
      const serviceNames = bookingFlow.selectedServices.map(s => s.name).join(', ');
      
      // Get the first professional (since we're using the same professional for all services)
      const firstServiceId = Object.keys(bookingFlow.selectedProfessionals)[0];
      const selectedProfessional = bookingFlow.selectedProfessionals[firstServiceId];
      
      const bookingData = {
        bookingId: 'BK' + Date.now(),
        serviceNames,
        services: bookingFlow.selectedServices,
        professionalName: selectedProfessional.user?.fullName || 
          `${selectedProfessional.user?.firstName} ${selectedProfessional.user?.lastName}` || 
          selectedProfessional.name,
        date: new Date(bookingFlow.selectedTimeSlot.date).toLocaleDateString(),
        time: bookingFlow.selectedTimeSlot.time?.time || '10:00 AM',
        duration: totalDuration,
        servicePrice: totalPrice,
        totalAmount: Math.round(totalPrice * 1.05) // Including 5% tax
      };
      
      console.log('Payment component: Created booking data from booking flow:', bookingData);
      return bookingData;
    }
    
    // Fallback to localStorage data
    console.log('Payment component: Using fallback booking data:', bookingData);
    return bookingData;
  };
  
  const finalBookingData = createBookingData();
  
  console.log('Payment component: User data:', user);
  console.log('Payment component: Token:', token);
  console.log('Payment component: Booking data:', finalBookingData);
  console.log('Payment component: Booking data keys:', Object.keys(finalBookingData));
  console.log('Payment component: Has bookingId:', !!finalBookingData.bookingId);

  const createBookingInDatabase = async () => {
    try {
      console.log('Creating booking in database with data:', finalBookingData);
      
      // Prepare services data for the API
      const services = finalBookingData.services.map(service => {
        // Get the professional for this service
        const professional = bookingFlow.selectedProfessionals[service._id];
        
        // Calculate start and end times
        const appointmentDate = new Date(bookingFlow.selectedTimeSlot.date);
        const timeString = bookingFlow.selectedTimeSlot.time?.time || '10:00 AM';
        const [time, period] = timeString.split(' ');
        const [hours, minutes] = time.split(':');
        let hour = parseInt(hours);
        if (period === 'PM' && hour !== 12) hour += 12;
        if (period === 'AM' && hour === 12) hour = 0;
        
        appointmentDate.setHours(hour, parseInt(minutes), 0, 0);
        const startTime = new Date(appointmentDate);
        const endTime = new Date(appointmentDate.getTime() + service.duration * 60 * 1000);
        
        return {
          serviceId: service._id,
          employeeId: professional._id || professional.id,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          notes: ''
        };
      });
      
      const bookingData = {
        services,
        appointmentDate: new Date(bookingFlow.selectedTimeSlot.date).toISOString(),
        notes: ''
      };
      
      console.log('Sending booking data to API:', bookingData);
      
      const response = await fetch('https://spamanagment.onrender.com/api/v1/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create booking');
      }
      
      console.log('Booking created successfully:', data);
      
      // Update the booking data with the database ID
      finalBookingData.bookingId = data.data.booking._id;
      finalBookingData.bookingNumber = data.data.booking.bookingNumber;
      
      // Save the updated booking data to localStorage
      localStorage.setItem('currentBooking', JSON.stringify(finalBookingData));
      
      return data.data.booking;
      
    } catch (error) {
      console.error('Error creating booking in database:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (!user || !token) {
      navigate('/login', { state: { from: { pathname: '/payment' } } });
      return;
    }

    if (!finalBookingData.bookingId) {
      navigate('/booking');
      return;
    }

    // Create booking in database if it doesn't exist yet
    const initializePayment = async () => {
      try {
        // Check if this is a temporary booking ID (starts with 'BK')
        if (finalBookingData.bookingId.startsWith('BK')) {
          console.log('Creating booking in database...');
          await createBookingInDatabase();
        }
        
        // Get available payment gateways
        fetchAvailableGateways();
      } catch (error) {
        console.error('Error initializing payment:', error);
        setError('Failed to create booking. Please try again.');
      }
    };
    
    initializePayment();
  }, []);

  const fetchAvailableGateways = async () => {
    try {
      const response = await fetch('https://spamanagment.onrender.com/api/v1/payments/gateways/available', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        setAvailableGateways(data.data.gateways);
      }
    } catch (error) {
      console.error('Error fetching gateways:', error);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError('');

      // Redirect to Network International payment
      navigate('/payment/network', { 
        state: { 
          bookingData: finalBookingData,
          selectedGateway 
        } 
      });

    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToBooking = () => {
    navigate('/booking');
  };

  const handleViewBookings = () => {
    navigate('/dashboard');
  };

  if (!finalBookingData.bookingId) {
    console.log('Payment component: No booking data found, showing test content');
    return (
      <div className="payment-container">
        <div className="payment-card">
          <div className="payment-header">
            <h2>Payment Page Test</h2>
            <p>This is a test to see if the Payment component renders</p>
          </div>
          <div className="payment-details">
            <p>User: {user?.fullName}</p>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
            <p>Booking Data: {JSON.stringify(finalBookingData)}</p>
          </div>
          <div className="payment-actions">
            <button onClick={() => navigate('/')} className="btn-primary">
              Go to Home
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
          <h2>Complete Your Payment</h2>
          <p>Secure payment powered by Network International</p>
        </div>

        {/* Network International Branding */}
        <div className="network-international-brand">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>Network International</span>
        </div>

        <div className="payment-details">
          <div className="detail-row">
            <span>Booking ID:</span>
            <span>{finalBookingData.bookingId}</span>
          </div>
          
          {/* Display multiple services */}
          {finalBookingData.services && finalBookingData.services.length > 0 ? (
            <>
              <div className="detail-row">
                <span>Services:</span>
                <span>{finalBookingData.serviceNames}</span>
              </div>
              
              {/* Individual service breakdown */}
              <div className="services-breakdown">
                <h4>Service Details:</h4>
                {finalBookingData.services.map((service, index) => (
                  <div key={service._id} className="service-item">
                    <div className="service-name">{service.name}</div>
                    <div className="service-price">AED {service.price}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="detail-row">
              <span>Service:</span>
              <span>{finalBookingData.serviceName}</span>
            </div>
          )}
          
          <div className="detail-row">
            <span>Professional:</span>
            <span>{finalBookingData.professionalName}</span>
          </div>
          <div className="detail-row">
            <span>Date:</span>
            <span>{finalBookingData.date}</span>
          </div>
          <div className="detail-row">
            <span>Time:</span>
            <span>{finalBookingData.time}</span>
          </div>
          <div className="detail-row">
            <span>Duration:</span>
            <span>{finalBookingData.duration} minutes</span>
          </div>
          <div className="detail-row">
            <span>Subtotal:</span>
            <span>AED {finalBookingData.servicePrice}</span>
          </div>
          <div className="detail-row">
            <span>Tax (5%):</span>
            <span>AED {(finalBookingData.servicePrice * 0.05).toFixed(2)}</span>
          </div>
          <div className="detail-row" style={{ borderTop: '2px solid #667eea', paddingTop: '15px', marginTop: '10px' }}>
            <span style={{ fontWeight: '700', fontSize: '18px' }}>Total Amount:</span>
            <span style={{ fontWeight: '700', fontSize: '18px', color: '#667eea' }}>
              AED {finalBookingData.totalAmount}
            </span>
          </div>
        </div>

        {/* Payment Gateway Selection */}
        <div className="gateway-selection">
          <h3>Payment Method</h3>
          <div className="gateway-options">
            {availableGateways.map((gateway) => (
              <div 
                key={gateway.name}
                className={`gateway-option ${selectedGateway === gateway.name ? 'selected' : ''}`}
                onClick={() => setSelectedGateway(gateway.name)}
              >
                <div className="gateway-info">
                  <h4>{gateway.displayName}</h4>
                  <p>{gateway.description}</p>
                  <div className="gateway-features">
                    <span>💳 {gateway.supportedMethods.join(', ')}</span>
                    <span>🌍 {gateway.region}</span>
                  </div>
                </div>
                <div className="gateway-radio">
                  <input 
                    type="radio" 
                    name="gateway" 
                    value={gateway.name}
                    checked={selectedGateway === gateway.name}
                    onChange={() => setSelectedGateway(gateway.name)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Actions */}
        <div className="payment-actions">
          <button 
            onClick={handlePayment} 
            className="btn-primary"
            disabled={loading || !selectedGateway}
          >
            {loading ? 'Processing...' : `Pay AED ${finalBookingData.totalAmount}`}
          </button>
          
          <button 
            onClick={handleBackToBooking} 
            className="btn-secondary"
          >
            Back to Booking
          </button>
          
          <button 
            onClick={handleViewBookings} 
            className="btn-outline"
          >
            View My Bookings
          </button>
        </div>

        {/* Payment Security Info */}
        <div className="payment-info">
          <h3>🔒 Secure Payment</h3>
          <ul>
            <li>SSL encrypted connection</li>
            <li>PCI DSS compliant</li>
            <li>Multiple payment methods</li>
            <li>UAE & Middle East coverage</li>
            <li>24/7 customer support</li>
          </ul>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;