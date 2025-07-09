import React from 'react';
import Allora from './Components/Allora';
import './Layout.css'; // Link the CSS file

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <div className="sidebar">
        <Allora />
      </div>
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
