import React, { useState } from 'react';
import './Demo.css';
import { 
  Home, 
  Calendar, 
  Tag, 
  Clock, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Grid3X3,
  Search,
  Bell,
  Settings,
  User,
  Plus,
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Layout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSecondarySidebar, setShowSecondarySidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const sidebarItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'calendar', icon: Calendar, label: 'Calendar' },
    { id: 'sales', icon: Tag, label: 'Sales' },
    { id: 'history', icon: Clock, label: 'History' },
    { id: 'catalog', icon: BookOpen, label: 'Catalog' },
    { id: 'clients', icon: Users, label: 'Clients' },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
    { id: 'apps', icon: Grid3X3, label: 'Apps' },
  ];

  const salesSubMenu = [
    { id: 'daily-sales', label: 'Daily sales summary', active: true },
    { id: 'appointments', label: 'Appointments' },
    { id: 'sales-overview', label: 'Sales' },
    { id: 'payments', label: 'Payments' },
    { id: 'gift-cards', label: 'Gift cards sold' },
    { id: 'memberships', label: 'Memberships sold' },
    { id: 'product-orders', label: 'Product orders' },
  ];

  const handleSidebarClick = (itemId) => {
    setActiveTab(itemId);
    setCurrentPage(itemId);
    
    // Show secondary sidebar for specific pages
    if (itemId === 'sales' || itemId === 'clients' || itemId === 'catalog') {
      setShowSecondarySidebar(true);
    } else {
      setShowSecondarySidebar(false);
    }
  };

  const DashboardContent = () => (
    <div className="fresha-unique-dashboard-container">
      <div className="fresha-unique-dashboard-grid">
        {/* Top Services */}
        <div className="fresha-unique-dashboard-card">
          <h3 className="fresha-unique-dashboard-card-title">Top services</h3>
          <div className="fresha-unique-dashboard-card-content">
            <div className="fresha-unique-table-header">
              <span className="fresha-unique-table-header-cell">Service</span>
              <div className="fresha-unique-table-header-actions">
                <span className="fresha-unique-table-header-cell">This month</span>
                <span className="fresha-unique-table-header-cell">Last month</span>
              </div>
            </div>
            {[
              { name: 'Relaxing Message', current: 282, previous: 514 },
              { name: 'Deep tissue Message', current: 13, previous: 7 },
              { name: 'Mini Facial', current: 5, previous: 3 },
              { name: 'Candle Message', current: 5, previous: 13 },
              { name: 'Balinese Message', current: 5, previous: 5 },
            ].map((service, index) => (
              <div key={index} className="fresha-unique-table-row">
                <span className="fresha-unique-table-cell-service">{service.name}</span>
                <div className="fresha-unique-table-row-actions">
                  <span className="fresha-unique-table-cell-current">{service.current}</span>
                  <span className="fresha-unique-table-cell-previous">{service.previous}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Team Member */}
        <div className="fresha-unique-dashboard-card">
          <h3 className="fresha-unique-dashboard-card-title">Top team member</h3>
          <div className="fresha-unique-dashboard-card-content">
            <div className="fresha-unique-table-header">
              <span className="fresha-unique-table-header-cell">Team member</span>
              <div className="fresha-unique-table-header-actions">
                <span className="fresha-unique-table-header-cell">This month</span>
                <span className="fresha-unique-table-header-cell">Last month</span>
              </div>
            </div>
            {[
              { name: 'Sarita Lamsal', current: 'AED 13,809.00', previous: 'AED 18,173.00' },
              { name: 'Dayu Eka', current: 'AED 12,250.00', previous: 'AED 2,825.00' },
              { name: 'Icha Faradisa', current: 'AED 11,440.00', previous: 'AED 18,700.00' },
              { name: 'Employee', current: 'AED 10,930.00', previous: 'AED 23,355.00' },
              { name: 'Nining Niken', current: 'AED 10,560.00', previous: 'AED 19,374.00' },
            ].map((member, index) => (
              <div key={index} className="fresha-unique-table-row">
                <span className="fresha-unique-table-cell-service">{member.name}</span>
                <div className="fresha-unique-table-row-actions">
                  <span className="fresha-unique-table-cell-current">{member.current}</span>
                  <span className="fresha-unique-table-cell-previous">{member.previous}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const SalesContent = () => (
    <div className="fresha-unique-sales-container">
      <div className="fresha-unique-sales-header">
        <div className="fresha-unique-sales-header-content">
          <div className="fresha-unique-sales-title-section">
            <h1 className="fresha-unique-sales-title">Daily sales</h1>
            <p className="fresha-unique-sales-subtitle">View, filter and export the transactions and cash movement for the day.</p>
          </div>
          <div className="fresha-unique-sales-actions">
            <button className="fresha-unique-export-btn">
              <Download className="fresha-unique-export-icon" />
              Export
            </button>
            <button className="fresha-unique-add-btn">
              <Plus className="fresha-unique-add-icon" />
              Add new
            </button>
          </div>
        </div>
        
        <div className="fresha-unique-sales-controls">
          <button className="fresha-unique-nav-control">
            <ChevronLeft className="fresha-unique-nav-icon" />
          </button>
          <span className="fresha-unique-today-btn">Today</span>
          <span className="fresha-unique-date-display">Saturday 21 Jun, 2025</span>
          <button className="fresha-unique-nav-control">
            <ChevronRight className="fresha-unique-nav-icon" />
          </button>
        </div>
      </div>

      <div className="fresha-unique-sales-content-grid">
        {/* Transaction Summary */}
        <div className="fresha-unique-sales-card">
          <h3 className="fresha-unique-sales-card-title">Transaction summary</h3>
          <div className="fresha-unique-sales-card-content">
            <div className="fresha-unique-transaction-header">
              <span className="fresha-unique-transaction-header-cell">Item type</span>
              <span className="fresha-unique-transaction-header-cell">Sales qty</span>
              <span className="fresha-unique-transaction-header-cell">Refund qty</span>
              <span className="fresha-unique-transaction-header-cell">Gross total</span>
            </div>
            {[
              { type: 'Services', sales: 0, refunds: 0, total: 'AED 0.00' },
              { type: 'Products', sales: 0, refunds: 0, total: 'AED 0.00' },
              { type: 'Shipping', sales: 0, refunds: 0, total: 'AED 0.00' },
              { type: 'Gift cards', sales: 0, refunds: 0, total: 'AED 0.00' },
            ].map((item, index) => (
              <div key={index} className="fresha-unique-transaction-row">
                <span className="fresha-unique-transaction-cell">{item.type}</span>
                <span className="fresha-unique-transaction-cell">{item.sales}</span>
                <span className="fresha-unique-transaction-cell">{item.refunds}</span>
                <span className="fresha-unique-transaction-cell">{item.total}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cash Movement Summary */}
        <div className="fresha-unique-sales-card">
          <h3 className="fresha-unique-sales-card-title">Cash movement summary</h3>
          <div className="fresha-unique-sales-card-content">
            <div className="fresha-unique-cash-header">
              <span className="fresha-unique-cash-header-cell">Payment type</span>
              <span className="fresha-unique-cash-header-cell">Payments collected</span>
              <span className="fresha-unique-cash-header-cell">Refunds paid</span>
            </div>
            {[
              { type: 'Deposit Redemptions', collected: 'AED 0.00', refunded: 'AED 0.00' },
              { type: 'Fresha online', collected: 'AED 0.00', refunded: 'AED 0.00' },
              { type: 'Payment Link', collected: 'AED 0.00', refunded: 'AED 0.00' },
              { type: 'Cash', collected: 'AED 0.00', refunded: 'AED 0.00' },
            ].map((item, index) => (
              <div key={index} className="fresha-unique-cash-row">
                <span className="fresha-unique-cash-cell">{item.type}</span>
                <span className="fresha-unique-cash-cell">{item.collected}</span>
                <span className="fresha-unique-cash-cell">{item.refunded}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardContent />;
      case 'sales':
        return <SalesContent />;
      default:
        return (
          <div className="fresha-unique-default-page">
            <h1 className="fresha-unique-page-title">
              {sidebarItems.find(item => item.id === currentPage)?.label || 'Page'}
            </h1>
            <p className="fresha-unique-page-description">Content for {currentPage} page goes here.</p>
          </div>
        );
    }
  };

  return (
    <div className="fresha-unique-layout-container">
      {/* Top Navigation */}
      <nav className="fresha-unique-top-navigation">
        <div className="fresha-unique-nav-content">
          <div className="fresha-unique-logo">fresha</div>
          
          <div className="fresha-unique-nav-actions">
            <button className="fresha-unique-activate-plan-btn">
              <Settings className="fresha-unique-settings-icon" />
              Activate plan
            </button>
            
            <div className="fresha-unique-nav-icons">
              <button className="fresha-unique-nav-icon-btn">
                <Search className="fresha-unique-search-icon" />
              </button>
              <button className="fresha-unique-nav-icon-btn">
                <Bell className="fresha-unique-bell-icon" />
              </button>
              <button className="fresha-unique-nav-icon-btn">
                <Settings className="fresha-unique-settings-icon" />
              </button>
              <div className="fresha-unique-user-avatar">
                <User className="fresha-unique-user-icon" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="fresha-unique-layout-body">
        {/* Primary Sidebar */}
        <div className="fresha-unique-primary-sidebar">
          <div className="fresha-unique-sidebar-nav">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSidebarClick(item.id)}
                  className={`fresha-unique-sidebar-item ${
                    activeTab === item.id ? 'fresha-unique-sidebar-item-active' : 'fresha-unique-sidebar-item-inactive'
                  }`}
                  title={item.label}
                >
                  <Icon className="fresha-unique-sidebar-icon" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Sidebar */}
        {showSecondarySidebar && (
          <div className="fresha-unique-secondary-sidebar">
            <div className="fresha-unique-secondary-sidebar-content">
              <h3 className="fresha-unique-secondary-sidebar-title">Sales</h3>
              <nav className="fresha-unique-secondary-sidebar-nav">
                {salesSubMenu.map((item) => (
                  <a
                    key={item.id}
                    href="#"
                    className={`fresha-unique-secondary-nav-item ${
                      item.active ? 'fresha-unique-secondary-nav-item-active' : 'fresha-unique-secondary-nav-item-inactive'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div 
          className={`fresha-unique-main-content ${
            showSecondarySidebar ? 'fresha-unique-main-content-with-secondary' : 'fresha-unique-main-content-without-secondary'
          }`}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Layout;