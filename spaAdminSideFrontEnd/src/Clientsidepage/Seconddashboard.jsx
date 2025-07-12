import React from 'react';
import './Seconddashboard.css';

const SalesDashboard = () => {
  return (
    <div className="sales-container">
      <div className="header">
        <button className="back-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="title">Sales</h1>
      </div>
      
      <div className="menu-list">
        <div className="menu-item ">
          Daily sales summary
        </div>
        
        <div className="menu-item ">
          Appointments
        </div>
        
        <div className="menu-item">
          Sales
        </div>
        
        <div className="menu-item">
          Payments
        </div>
        
        <div className="menu-item">
          Gift cards sold
        </div>
        
        <div className="menu-item">
          Memberships sold
        </div>
        
        <div className="menu-item">
          Product orders
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;