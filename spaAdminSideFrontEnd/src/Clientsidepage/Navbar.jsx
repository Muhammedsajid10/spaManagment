import React, { useState } from 'react';
import './Navbar.css';
import { FiSearch } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { MoreVertical, CheckCircle, Users } from 'lucide-react';
import spa from '../Images/spppa.jpg';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleSearch = () => {
    setShowSearch(prev => !prev);
    setShowNotifications(false);
  };

  const toggleNotification = () => {
    setShowNotifications(prev => !prev);
    setShowSearch(false);
  };

  const appointments = [
    {
      id: 1,
      name: "Boris",
      service: "Jan Deep Tissue Massage",
      amount: "AED 510",
      date: "23:00 Tue 17",
      status: "read",
      avatar: "B",
      avatarColor: "bg-blue-500"
    },
    {
      id: 2,
      name: "AGNEESHWARAN",
      service: "Jun Balinese Massage",
      amount: "AED 410",
      date: "17:45 Tue 10",
      status: "read",
      avatar: "A",
      avatarColor: "bg-purple-500"
    }
  ];

  return (
    <div className='navbar-container'>
      <img src={spa} alt="Logo" className='spa-image' />

      <div className="navbar-icons">
        <div className="search-wrapper">
          <button className='icon' onClick={toggleSearch}>
            <FiSearch />
          </button>
          {showSearch && (
            <div className="search-dropdown">
              <input type="text" placeholder="Search..." />
            </div>
          )}
        </div>

        <div className="notification-wrapper">
          <button className='icon' onClick={toggleNotification}>
            <IoNotificationsOutline />
          </button>
          {showNotifications && (
            <div className="notification-dropdown custom-popup">
              <div className="appointments-container">
                <div className="appointments-header">
                  <h1 className="appointments-title">Appointments</h1>
                  <button className="more-button">
                    <MoreVertical size={20} className="more-icon" />
                  </button>
                </div>

                <div className="appointments-section">
                  <div className="section-header">
                    <span className="section-title">Read</span>
                  </div>

                  <div className="appointments-list">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="appointment-item">
                        <div className="appointment-avatar-container">
                          <div className={`appointment-avatar ${appointment.avatarColor}`}>
                            {appointment.avatar}
                          </div>
                          <div className="status-indicators">
                            <CheckCircle size={16} className="check-icon" />
                            <Users size={14} className="users-icon" />
                          </div>
                        </div>

                        <div className="appointment-content">
                          <div className="appointment-main">
                            <span className="customer-name">{appointment.name}</span>
                            <span className="booking-text">booked online</span>
                            <span className="amount">{appointment.amount}</span>
                          </div>
                          <div className="appointment-details">
                            <span className="date-time">{appointment.date}</span>
                            <span className="service-name">{appointment.service}</span>
                            <span className="booking-info">booked online with you</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;