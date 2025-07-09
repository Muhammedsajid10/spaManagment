import React, { useEffect, useState, useRef } from "react";
import "./Services.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { servicesAPI, apiUtils, bookingFlow } from "../services/api";

function Services() {
  const [services, setServices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("");
  const sectionRefs = useRef({});
  const [expandedStates, setExpandedStates] = useState({});
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedServicesCount, setSelectedServicesCount] = useState(0);

  // Fetch services from API
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await servicesAPI.getAllServices();
      
      if (response.success) {
        // Group services by category
        const groupedServices = {};
        response.data.services.forEach(service => {
          if (!groupedServices[service.category]) {
            groupedServices[service.category] = [];
          }
          
          groupedServices[service.category].push({
            id: service._id,
            title: service.name,
            time: apiUtils.formatDuration(service.duration),
            desc: service.description,
            price: apiUtils.formatPrice(service.effectivePrice || service.price),
            originalPrice: service.price,
            discountPrice: service.discountPrice,
            category: service.category,
            isPopular: service.isPopular,
            ratings: service.ratings,
            // Add original service data for booking flow
            _id: service._id,
            name: service.name,
            duration: service.duration,
            effectivePrice: service.effectivePrice || service.price
          });
        });
        
        setServices(groupedServices);
        
        // Set first category as active
        const categories = Object.keys(groupedServices);
        if (categories.length > 0) {
          setActiveSection(categories[0]);
        }
      } else {
        setError('Failed to fetch services');
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err.message || 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute("data-title"));
          }
        });
      },
      { rootMargin: "-50% 0px -40% 0px", threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [services]);

  const scrollToSection = (key) => {
    const element = sectionRefs.current[key];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleReadMore = (category, index) => {
    const key = `${category}-${index}`;
    setExpandedStates((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isExpanded = (category, index) => {
    const key = `${category}-${index}`;
    return expandedStates[key];
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowModal(true);
    setSelectedOption(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
    setSelectedOption(null);
  };

  const handleAddToBooking = () => {
    if (selectedService && selectedOption) {
      console.log('Adding service to booking:', selectedService);
      
      // Save the selected service to booking flow
      const serviceForBooking = {
        _id: selectedService._id,
        name: selectedService.title,
        duration: selectedService.duration,
        price: selectedService.effectivePrice,
        description: selectedService.desc,
        category: selectedService.category
      };
      
      console.log('Service for booking:', serviceForBooking);
      
      // Add service to booking flow (supports multiple services now)
      bookingFlow.addService(serviceForBooking);
      
      console.log('Service added to booking:', serviceForBooking);
      handleCloseModal();
      
      // Show success message with updated count
      const newCount = bookingFlow.selectedServices.length;
      alert(`Service added to booking! You now have ${newCount} service${newCount > 1 ? 's' : ''} selected. You can add more services or click Continue in the sidebar to proceed.`);
    }
  };

  // Load selected services count
  useEffect(() => {
    const loadSelectedServicesCount = () => {
      bookingFlow.load();
      setSelectedServicesCount(bookingFlow.selectedServices.length);
    };
    
    loadSelectedServicesCount();
    
    // Listen for changes in booking flow
    const handleBookingFlowChange = () => {
      loadSelectedServicesCount();
    };
    
    window.addEventListener('bookingFlowChange', handleBookingFlowChange);
    
    return () => {
      window.removeEventListener('bookingFlowChange', handleBookingFlowChange);
    };
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="svc-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ marginTop: '20px' }}>Loading services...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="svc-container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h3>Error Loading Services</h3>
          <p>{error}</p>
          <button 
            className="btn btn-primary" 
            onClick={fetchServices}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="svc-container">
      <div className="svc-header">
        <h2>Services</h2>
        {selectedServicesCount > 0 && (
          <div className="svc-cart-indicator">
            <span className="cart-count">{selectedServicesCount}</span>
            <span className="cart-text">services selected</span>
          </div>
        )}
      </div>

      <nav className="svc-nav">
        {Object.keys(services).map((category) => (
          <button
            key={category}
            className={activeSection === category ? "active" : ""}
            onClick={() => scrollToSection(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      {Object.entries(services).map(([category, servicesList]) => (
        <div
          key={category}
          id={category.replace(/\s+/g, "-").toLowerCase()}
          className="svc-category-section"
          data-title={category}
          ref={(el) => (sectionRefs.current[category] = el)}
        >
          <h3 className="svc-category-title">{category}</h3>
          <div className="svc-list">
            {servicesList.map((item, idx) => {
              const isOpen = isExpanded(category, idx);
              const shortDesc =
                item.desc.length > 100
                  ? item.desc.slice(0, 100) + "..."
                  : item.desc;
              return (
                <div
                  className="svc-item"
                  key={idx}
                  onClick={() => handleServiceClick(item)}
                >
                  <div className="svc-info">
                    <h4>{item.title}</h4>
                    <span className="time">{item.time}</span>
                    <p>
                      {isOpen ? item.desc : shortDesc}
                      {item.desc.length > 100 && (
                        <span
                          className="svc-read-more"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleReadMore(category, idx);
                          }}
                        >
                          {isOpen ? " Read less" : " Read more"}
                        </span>
                      )}
                    </p>
                    <span className="svc-price">{item.price}</span>
                    {item.discountPrice && item.discountPrice < item.originalPrice && (
                      <span className="svc-original-price" style={{ textDecoration: 'line-through', color: '#999', marginLeft: '10px' }}>
                        {apiUtils.formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    className="svc-add-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick(item);
                    }}
                  >
                    +
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="svc-group">
        <h4>Try something else</h4>
        <div className="svc-group-box">
          <strong>Group appointments</strong>
          <span>Book for yourself and others</span>
        </div>
      </div>
      
      {/* Service Modal */}
      {showModal && selectedService && (
  <div className="svc-popup-overlay" onClick={handleCloseModal}>
    <div className="svc-popup" onClick={(e) => e.stopPropagation()}>
      <div className="svc-popup-header">
              <h2>{selectedService.title}</h2>
        <button className="close-btn" onClick={handleCloseModal}>×</button>
      </div>

      <div className="svc-popup-body">
        <p className="svc-popup-desc">
                {selectedService.desc.slice(0, 160)}...
          <span className="read-more"> Read more</span>
        </p>

        <h4 className="svc-popup-subtitle">Select an option <span className="required">*</span></h4>

        <div className="svc-option-list">
          <label className="svc-option-item">
            <input
              type="radio"
              name="svcOption"
                    value="single"
                    checked={selectedOption === "single"}
                    onChange={() => setSelectedOption("single")}
            />
            <div>
                    <strong>{selectedService.title}</strong>
                    <div className="svc-option-time">{selectedService.time}</div>
                    <div className="svc-option-price">{selectedService.price}</div>
            </div>
          </label>

          <hr />

          <label className="svc-option-item">
            <input
              type="radio"
              name="svcOption"
                    value="couple"
                    checked={selectedOption === "couple"}
                    onChange={() => setSelectedOption("couple")}
            />
            <div>
              <strong>Couple</strong>
                    <div className="svc-option-time">{selectedService.time}</div>
                    <div className="svc-option-price">
                      {apiUtils.formatPrice((selectedService.originalPrice || selectedService.price.replace('AED ', '')) * 2)}
                    </div>
            </div>
          </label>
        </div>
      </div>

      <div className="svc-popup-footer">
        <button
          className={selectedOption ? "btn-enabled" : "btn-disabled"}
          disabled={!selectedOption}
                onClick={handleAddToBooking}
        >
          Add to booking
        </button>
      </div>
    </div>
  </div>
)}

      {/* Fixed bottom bar for mobile */}
      {typeof window !== 'undefined' && window.innerWidth <= 600 && selectedServicesCount > 0 && (
        <ServiceBottomBar />
      )}
    </div>
  );
}

// Helper component for the fixed bottom bar
function ServiceBottomBar() {
  // Get selected services from bookingFlow
  const [selectedServices, setSelectedServices] = React.useState([]);
  React.useEffect(() => {
    bookingFlow.load();
    setSelectedServices(bookingFlow.selectedServices || []);
    const handler = () => {
      bookingFlow.load();
      setSelectedServices(bookingFlow.selectedServices || []);
    };
    window.addEventListener('bookingFlowChange', handler);
    return () => window.removeEventListener('bookingFlowChange', handler);
  }, []);

  // Calculate total duration and total rate
  const totalDuration = selectedServices.reduce((sum, svc) => sum + (svc.duration || 0), 0);
  const totalRate = selectedServices.reduce((sum, svc) => sum + (svc.price || 0), 0);

  return (
    <div className="service-bottom-bar">
      <span>{totalDuration} min</span>
      <span>{selectedServices.length} services</span>
      <span>AED {totalRate}</span>
    </div>
  );
}

export default Services;
