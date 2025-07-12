import React, { useState } from 'react';
import './Membership.css';

const Membership = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  const memberships = [
    { name: 'W residence', client: 'Sam W RESIDENCE', type: 'One-time', startDate: '14 Jun 2025', endDate: '13 Jun 2027', status: 'Active', total: 'AED 1,600' },
    { name: 'Kempensiki', client: 'dikshit', type: 'One-time', startDate: '14 Jun 2025', endDate: '13 Jul 2025', status: 'Active', total: 'AED 1,000' },
    { name: 'lymphatic package', client: 'Labor', type: 'One-time', startDate: '31 May 2025', endDate: '30 May 2026', status: 'Active', total: 'AED 1,200' },
    { name: 'W residence', client: 'sergei', type: 'One-time', startDate: '27 May 2025', endDate: '26 May 2027', status: 'Used', total: 'AED 1,600' },
    { name: 'Anti Cellulite', client: 'cinderlla', type: 'One-time', startDate: '24 May 2025', endDate: '23 Jun 2025', status: 'Active', total: 'AED 1,400' }
  ];

  const filteredMemberships = memberships.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = status => status === 'Active' ? 'mem-status-active' : 'mem-status-used';

  const SearchIcon = () => (
    <svg className="mem-search-icon mem-icon" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  );

  const FilterIcon = () => (
    <svg className="mem-icon" viewBox="0 0 24 24">
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg className="mem-icon" viewBox="0 0 24 24">
      <polyline points="6,9 12,15 18,9"></polyline>
    </svg>
  );

  const DownloadIcon = () => (
    <svg className="mem-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const toggleFilters = () => setShowFilters(!showFilters);
  const toggleExportDropdown = () => setShowExportDropdown(!showExportDropdown);

  const handleExportCSV = () => {
    const headers = ['Name', 'Client', 'Type', 'Start Date', 'End Date', 'Status', 'Total Charged'];
    const csvContent = [
      headers.join(','),
      ...filteredMemberships.map(m => [
        m.name,
        m.client,
        m.type,
        m.startDate,
        m.endDate,
        m.status,
        m.total
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'memberships.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    setShowExportDropdown(false);
  };

  const handleExportPDF = () => {
    // Create HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Memberships Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #1e293b; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
          th { background-color: #f8fafc; font-weight: 600; }
          .status-active { background-color: #dcfce7; color: #166534; padding: 4px 8px; border-radius: 12px; }
          .status-used { background-color: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 12px; }
          .total { font-weight: 600; }
        </style>
      </head>
      <body>
        <h1>Memberships Report</h1>
        <p>Generated on: ${new Date().toLocaleDateString()}</p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Client</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Total Charged</th>
            </tr>
          </thead>
          <tbody>
            ${filteredMemberships.map(m => `
              <tr>
                <td>${m.name}</td>
                <td>${m.client}</td>
                <td>${m.type}</td>
                <td>${m.startDate}</td>
                <td>${m.endDate}</td>
                <td><span class="status-${m.status.toLowerCase()}">${m.status}</span></td>
                <td class="total">${m.total}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    // Create a new window and print to PDF
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
    
    setShowExportDropdown(false);
  };

  const handleExportExcel = () => {
    // Create worksheet data
    const wsData = [
      ['Name', 'Client', 'Type', 'Start Date', 'End Date', 'Status', 'Total Charged'],
      ...filteredMemberships.map(m => [
        m.name,
        m.client,
        m.type,
        m.startDate,
        m.endDate,
        m.status,
        m.total
      ])
    ];

    // Convert to CSV format for Excel compatibility
    const csvContent = wsData.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');

    // Create Excel file with proper MIME type
    const blob = new Blob(['\ufeff' + csvContent], { 
      type: 'application/vnd.ms-excel;charset=utf-8' 
    });
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'memberships.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    
    setShowExportDropdown(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (showExportDropdown && !event.target.closest('.mem-export-container')) {
        setShowExportDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showExportDropdown]);

  return (
    <div className="mem-container">
      <div className="mem-max-width">
        <div className="mem-header">
          <div className="mem-header-content">
            <h1 className="mem-title">Memberships sold</h1>
            <p className="mem-subtitle">
              View and filter memberships purchased by your clients.{' '}
              <a href="#" className="mem-learn-more">Read more</a>
            </p>
          </div>
          <div className="mem-export-container">
            <button 
              className="mem-export-btn"
              onClick={toggleExportDropdown}
            >
              <DownloadIcon />
              <span>Export</span>
              <ChevronDownIcon />
            </button>
            
            {showExportDropdown && (
              <div className="mem-export-dropdown">
                <button onClick={handleExportCSV} className="mem-export-option">
                  Export to CSV
                </button>
                <button onClick={handleExportPDF} className="mem-export-option">
                  Export to PDF
                </button>
                <button onClick={handleExportExcel} className="mem-export-option">
                  Export to Excel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mem-search-container">
          <div className="mem-search-wrapper">
            <SearchIcon />
            <input
              type="text"
              className="mem-search-input"
              placeholder="Search by client or membership"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="mem-table-container">
          <div className="mem-table-wrapper">
            <table className="mem-table">
              <thead className="mem-table-header">
                <tr>
                  <th>Name</th>
                  <th>Client</th>
                  <th>Type</th>
                  <th>Start date</th>
                  <th>End date</th>
                  <th>Status</th>
                  <th>Total charged</th>
                </tr>
              </thead>
              <tbody>
                {filteredMemberships.map((membership, index) => (
                  <tr key={index} className="mem-table-row">
                    <td className="mem-table-cell">
                      <a href="#" className="mem-link-text">{membership.name}</a>
                    </td>
                    <td className="mem-table-cell">
                      <a href="#" className="mem-link-text">{membership.client}</a>
                    </td>
                    <td className="mem-table-cell">{membership.type}</td>
                    <td className="mem-table-cell mem-date-text">{membership.startDate}</td>
                    <td className="mem-table-cell mem-date-text">{membership.endDate}</td>
                    <td className="mem-table-cell">
                      <span className={`mem-status-badge ${getStatusClass(membership.status)}`}>
                        {membership.status}
                      </span>
                    </td>
                    <td className="mem-table-cell mem-total-amount">{membership.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mem-cards-container">
          {filteredMemberships.map((membership, index) => (
            <div key={index} className="mem-card">
              <div className="mem-card-header">
                <div className="mem-card-info">
                  <a href="#" className="mem-card-title">{membership.name}</a>
                  <div className="mem-card-client">{membership.client}</div>
                </div>
                <span className={`mem-status-badge ${getStatusClass(membership.status)}`}>
                  {membership.status}
                </span>
              </div>

              <div className="mem-card-grid">
                <div className="mem-card-field">
                  <div className="mem-card-label">Type</div>
                  <div className="mem-card-value">{membership.type}</div>
                </div>
                <div className="mem-card-field">
                  <div className="mem-card-label">Start date</div>
                  <div className="mem-card-value mem-date-text">{membership.startDate}</div>
                </div>
                <div className="mem-card-field">
                  <div className="mem-card-label">End date</div>
                  <div className="mem-card-value mem-date-text">{membership.endDate}</div>
                </div>
                <div className="mem-card-field mem-card-total">
                  <div className="mem-card-label">Total charged</div>
                  <div className="mem-card-value">{membership.total}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMemberships.length === 0 && (
          <div className="mem-no-results">
            <p>No memberships found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Membership;