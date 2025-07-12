import React, { useState, useEffect, useRef } from "react";
import "./Dailysalesss.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Calendar, Users, XSquare, Tag, DollarSign } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import * as XLSX from "xlsx";

const DailySales = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const calendarRef = useRef(null);
  const addMenuRef = useRef(null);
  const exportMenuRef = useRef(null);

  const transactionSummary = [
    { itemType: "Services", salesQty: 0, refundQty: 0, grossTotal: "AED 0.00" },
    { itemType: "Products", salesQty: 0, refundQty: 0, grossTotal: "AED 0.00" },
    { itemType: "Shipping", salesQty: 0, refundQty: 0, grossTotal: "AED 0.00" },
    { itemType: "Gift cards", salesQty: 0, refundQty: 0, grossTotal: "AED 0.00" },
  ];

  const cashMovementSummary = [
    { paymentType: "Deposit Redemptions", paymentsCollected: "AED 0.00", refundsPaid: "AED 0.00" },
    { paymentType: "Fresha online", paymentsCollected: "AED 0.00", refundsPaid: "AED 0.00" },
    { paymentType: "Payment Link", paymentsCollected: "AED 0.00", refundsPaid: "AED 0.00" },
    { paymentType: "Cash", paymentsCollected: "AED 0.00", refundsPaid: "AED 0.00" },
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction Summary", 14, 10);
    autoTable(doc, {
      startY: 15,
      head: [["Item type", "Sales qty", "Refund qty", "Gross total"]],
      body: transactionSummary.map(item => [
        item.itemType,
        item.salesQty,
        item.refundQty,
        item.grossTotal
      ]),
    });

    doc.text("Cash Movement Summary", 14, doc.lastAutoTable.finalY + 10);
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 15,
      head: [["Payment type", "Payments collected", "Refunds paid"]],
      body: cashMovementSummary.map(item => [
        item.paymentType,
        item.paymentsCollected,
        item.refundsPaid
      ]),
    });

    doc.save("DailySales.pdf");
  };

  const handleExportCSV = () => {
    const csvData = [
      ["Item type", "Sales qty", "Refund qty", "Gross total"],
      ...transactionSummary.map(item => [
        item.itemType,
        item.salesQty,
        item.refundQty,
        item.grossTotal
      ]),
      [],
      ["Payment type", "Payments collected", "Refunds paid"],
      ...cashMovementSummary.map(item => [
        item.paymentType,
        item.paymentsCollected,
        item.refundsPaid
      ])
    ];
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DailySales.csv";
    link.click();
  };

  const handleExportExcel = () => {
    const wsData1 = [
      ["Item type", "Sales qty", "Refund qty", "Gross total"],
      ...transactionSummary.map(item => [
        item.itemType,
        item.salesQty,
        item.refundQty,
        item.grossTotal,
      ])
    ];

    const wsData2 = [
      ["Payment type", "Payments collected", "Refunds paid"],
      ...cashMovementSummary.map(item => [
        item.paymentType,
        item.paymentsCollected,
        item.refundsPaid,
      ])
    ];

    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.aoa_to_sheet(wsData1);
    const ws2 = XLSX.utils.aoa_to_sheet(wsData2);
    XLSX.utils.book_append_sheet(wb, ws1, "Transaction Summary");
    XLSX.utils.book_append_sheet(wb, ws2, "Cash Movement Summary");
    XLSX.writeFile(wb, "DailySales.xlsx");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
      if (addMenuRef.current && !addMenuRef.current.contains(e.target)) {
        setShowAddMenu(false);
      }
      if (exportMenuRef.current && !exportMenuRef.current.contains(e.target)) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="ds-container">
      <div className="ds-top-bar">
        <div>
          <h1 className="ds-title">Daily sales</h1>
          <p className="ds-subtitle">View, filter and export the transactions and cash movement for the day.</p>
        </div>
        <div className="ds-actions">
          {/* Export Dropdown */}
          <div className="ds-export-dropdown-container" ref={exportMenuRef}>
            <button className="ds-export-btn" onClick={() => setShowExportMenu(!showExportMenu)}>
              Export
            </button>
            {showExportMenu && (
              <div className="ds-export-dropdown">
                <div className="ds-dropdown-item" onClick={handleExportPDF}>Export PDF</div>
                <div className="ds-dropdown-item" onClick={handleExportCSV}>Export CSV</div>
                <div className="ds-dropdown-item" onClick={handleExportExcel}>Export Excel</div>
              </div>
            )}
          </div>

          {/* Add Dropdown */}
         
        </div>
      </div>

      <div className="ds-date-section" ref={calendarRef}>
        <div className="ds-date-controls">
          <div className="ds-today-btn" onClick={() => { setCurrentDate(new Date()); setShowCalendar(false); }}>
            Today
          </div>
          <div className="ds-date-display-wrapper" onClick={() => setShowCalendar(!showCalendar)}>
            <span className="ds-arrow-icon" onClick={(e) => { e.stopPropagation(); changeDate(-1); }}>
              <IoIosArrowBack />
            </span>
            <div className="ds-date-display">{formatDate(currentDate)}</div>
            <span className="ds-arrow-icon" onClick={(e) => { e.stopPropagation(); changeDate(1); }}>
              <IoIosArrowForward />
            </span>
          </div>
        </div>

        {showCalendar && (
          <div className="ds-calendar-popup">
            <DatePicker
              selected={currentDate}
              onChange={(date) => {
                setCurrentDate(date);
                setShowCalendar(false);
              }}
              inline
              calendarClassName="ds-datepicker"
            />
          </div>
        )}
      </div>

      <div className="ds-tables">
        <div className="ds-table-card">
          <h2 className="ds-table-title">Transaction summary</h2>
          <div className="ds-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Item type</th>
                  <th>Sales qty</th>
                  <th>Refund qty</th>
                  <th>Gross total</th>
                </tr>
              </thead>
              <tbody>
                {transactionSummary.map((item, index) => (
                  <tr key={index}>
                    <td>{item.itemType}</td>
                    <td>{item.salesQty}</td>
                    <td>{item.refundQty}</td>
                    <td>{item.grossTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ds-table-card">
          <h2 className="ds-table-title">Cash movement summary</h2>
          <div className="ds-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Payment type</th>
                  <th>Payments collected</th>
                  <th>Refunds paid</th>
                </tr>
              </thead>
              <tbody>
                {cashMovementSummary.map((item, index) => (
                  <tr key={index}>
                    <td>{item.paymentType}</td>
                    <td>{item.paymentsCollected}</td>
                    <td>{item.refundsPaid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySales;
