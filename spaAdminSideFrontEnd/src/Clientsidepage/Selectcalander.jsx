import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Sliders,
  CalendarDays,
  RotateCcw,
  Settings,
  Calendar,
  XSquare,
  Tag,
  DollarSign,
} from "lucide-react";

import "./Selectcalander.css";

const CustomCalendar = ({ isVisible, onClose, onDateSelect, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleDateClick = (day, monthOffset = 0) => {
    const selectedDateObj = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + monthOffset,
      day
    );
    onDateSelect(selectedDateObj);
    onClose();
  };

  const handleWeekSelect = (weeks) => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + weeks * 7);
    onDateSelect(futureDate);
    onClose();
  };

  const renderMonth = (monthOffset = 0) => {
    const displayDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + monthOffset,
      1
    );
    const daysInMonth = getDaysInMonth(displayDate);
    const firstDay = getFirstDayOfMonth(displayDate);
    const today = new Date();
    const isCurrentMonth =
      displayDate.getMonth() === today.getMonth() &&
      displayDate.getFullYear() === today.getFullYear();

    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && day === today.getDate();
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === displayDate.getMonth() &&
        selectedDate.getFullYear() === displayDate.getFullYear();

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? "today" : ""} ${
            isSelected ? "selected" : ""
          }`}
          onClick={() => handleDateClick(day, monthOffset)}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="calendar-month">
        <div className="calendar-month-header">
          <h3>
            {monthNames[displayDate.getMonth()]} {displayDate.getFullYear()}
          </h3>
        </div>
        <div className="calendar-weekdays">
          {dayNames.map((day) => (
            <div key={day} className="calendar-weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-days">{days}</div>
      </div>
    );
  };

  if (!isVisible) return null;

  return (
    <div className="calendar-overlay">
      <div className="custom-calendar" ref={calendarRef}>
        <div className="calendar-header">
          <button
            className="calendar-nav-btn"
            onClick={() => navigateMonth(-1)}
          >
            <ChevronLeft size={20} />
          </button>
          <button className="calendar-nav-btn" onClick={() => navigateMonth(1)}>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="calendar-months">
          {renderMonth(0)}
          {renderMonth(1)}
        </div>

        <div className="calendar-quick-select">
          <button
            className="quick-select-btn"
            onClick={() => handleWeekSelect(1)}
          >
            In 1 week
          </button>
          <button
            className="quick-select-btn"
            onClick={() => handleWeekSelect(2)}
          >
            In 2 weeks
          </button>
          <button
            className="quick-select-btn"
            onClick={() => handleWeekSelect(3)}
          >
            In 3 weeks
          </button>
          <button
            className="quick-select-btn"
            onClick={() => handleWeekSelect(4)}
          >
            In 4 weeks
          </button>
          <button
            className="quick-select-btn"
            onClick={() => handleWeekSelect(5)}
          >
            In 5 weeks
          </button>
          <div className="more-options">
            <button className="quick-select-btn">More ▾</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Team selection component
const TeamSelection = ({
  isVisible,
  onClose,
  staffList,
  selectedStaff,
  onStaffToggle,
}) => {
  const teamRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (teamRef.current && !teamRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="team-selection-overlay">
      <div className="team-selection-panel" ref={teamRef}>
        <div className="team-selection-header">
          <div className="team-option">
            <Users size={18} />
            <span>Scheduled team</span>
          </div>
          <div className="team-option">
            <Users size={18} />
            <span>All team</span>
          </div>
        </div>

        <div className="team-members-section">
          <div className="team-members-header">
            <h3>Team members</h3>
            <button className="clear-all-btn">Clear all</button>
          </div>

          <div className="team-members-list">
            {staffList.map((staff, index) => (
              <div key={index} className="team-member-item">
                <div className="team-member-checkbox">
                  <input
                    type="checkbox"
                    id={`staff-${index}`}
                    checked={selectedStaff.includes(index)}
                    onChange={() => onStaffToggle(index)}
                  />
                  <label htmlFor={`staff-${index}`} className="checkbox-label">
                    <div className="checkbox-custom"></div>
                  </label>
                </div>
                <div className="team-member-info">
                  <div className="team-member-avatar">
                    {staff.profileImage ? (
                      <img
                        src={staff.profileImage}
                        alt={staff.name}
                        className="avatar-image"
                      />
                    ) : (
                      <div
                        className="avatar-placeholder"
                        style={{ backgroundColor: staff.color }}
                      >
                        <span className="avatar-text">{staff.avatar}</span>
                      </div>
                    )}
                  </div>
                  <span className="team-member-name">{staff.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const staffList = [
  {
    name: "margrita Balute",
    avatar: "MB",
    color: "#f3e8ff",
    profileImage: null,
  },
  { name: "Icha Faradisa", avatar: "IF", color: "#fef3e2", profileImage: null },
  {
    name: "Nining Niken",
    avatar: "NN",
    color: "#f0f9ff",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    name: "Onni",
    avatar: "O",
    color: "#ffe8f0",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
  { name: "Putri Dahlia", avatar: "PD", color: "#e0f7ff", profileImage: null },
  { name: "Employee", avatar: "E", color: "#e0f7ff", profileImage: null },
  {
    name: "sarita Lamsal",
    avatar: "SL",
    color: "#f0fdf4",
    profileImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  },
];

// Generate 15-minute time slots (4 per hour) from 11:00 to 21:00
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 11; hour < 21; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeStr = `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}`;
      slots.push({
        time: timeStr,
        isHourStart: minute === 0,
        hour: hour,
        minute: minute
      });
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

const Scheduler = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState({});
  const [viewMode, setViewMode] = useState("Day");
  const [addDropdownOpen, setAddDropdownOpen] = useState(false);
  const [showViewDropdown, setShowViewDropdown] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [teamSelectionVisible, setTeamSelectionVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(
    staffList.map((_, index) => index)
  ); // All staff selected by default
  const [hoverTooltip, setHoverTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    content: null,
  });
  const [popupData, setPopupData] = useState({
    key: "",
    x: 0,
    y: 0,
    clientName: "",
    service: "",
    paymentMethod: "",
    staffIndex: null,
  });

  const [activeWaitlistTab, setActiveWaitlistTab] = useState("Booked");
  const [waitlistVisible,setWaitlistVisible] = useState(false);

  const popupRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setPopupVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentTimeStr = `${currentHour}:${
    currentMinute < 10 ? "0" + currentMinute : currentMinute
  }`;
  
  // Calculate current time position for 15-minute intervals
  const currentTimePosition = ((currentHour - 11) * 4 + Math.floor(currentMinute / 15)) * 15;

  // Format selected date for display
  const formatSelectedDate = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${dayName} ${day} ${month}`;
  };

  // Handle date navigation
  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  // Handle calendar date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCalendarVisible(false);
  };

  // Handle calendar toggle
  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  // Handle team selection toggle
  const toggleTeamSelection = () => {
    setTeamSelectionVisible(!teamSelectionVisible);
  };

  // Handle staff selection toggle
  const handleStaffToggle = (staffIndex) => {
    setSelectedStaff((prev) => {
      if (prev.includes(staffIndex)) {
        return prev.filter((index) => index !== staffIndex);
      } else {
        return [...prev, staffIndex];
      }
    });
  };

  // Handle Today button click
  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentTime(today);
  };

  const handleCellClick = (staffIndex, timeIndex, e) => {
    const key = `${staffIndex}-${timeIndex}`;
    const appointment = appointments[key];
    const rect = e.target.getBoundingClientRect();

    setPopupData({
      key,
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      clientName: appointment?.clientName || "",
      service: appointment?.service || "",
      paymentMethod: appointment?.paymentMethod || "",
      staffIndex,
    });

    setPopupVisible(true);
    setHoverTooltip({ visible: false, x: 0, y: 0, content: null });
  };

  const handleCellHover = (staffIndex, timeIndex, e, appointment) => {
    if (!popupVisible) {
      const rect = e.target.getBoundingClientRect();
      const staff = staffList[staffIndex];
      const timeSlot = timeSlots[timeIndex];

      // Generate specific details for each time slot
      const specificDetails = {
        clientName: appointment?.clientName || `Client ${timeIndex + 1}`,
        service: appointment?.service || getServiceForTimeSlot(timeIndex),
        paymentMethod: appointment?.paymentMethod || getPaymentMethodForTimeSlot(timeIndex),
        staff: staff.name,
        time: timeSlot.time,
        phone: getPhoneForTimeSlot(timeIndex),
        duration: getDurationForTimeSlot(timeIndex),
        price: getPriceForTimeSlot(timeIndex),
        originalPrice: getOriginalPriceForTimeSlot(timeIndex),
        status: getStatusForTimeSlot(timeIndex),
        serviceCount: getServiceCountForTimeSlot(timeIndex),
        staffIndex,
        timeIndex,
        key: `${staffIndex}-${timeIndex}`,
      };

      setHoverTooltip({
        visible: true,
        x: rect.left + window.scrollX + rect.width / 2,
        y: rect.top + window.scrollY - 10,
        content: specificDetails,
      });
    }
  };

  // Helper functions to generate specific details for each time slot
  const getServiceForTimeSlot = (timeIndex) => {
    const services = [
      "Relaxing Massage", "Deep Tissue Massage", "Hot Stone Therapy", 
      "Facial Treatment", "Manicure & Pedicure", "Hair Styling",
      "Body Scrub", "Aromatherapy", "Swedish Massage", "Reflexology"
    ];
    return services[timeIndex % services.length];
  };

  const getPaymentMethodForTimeSlot = (timeIndex) => {
    const methods = ["Cash", "Card", "UPI", "Online"];
    return methods[timeIndex % methods.length];
  };

  const getPhoneForTimeSlot = (timeIndex) => {
    const phones = [
      "+971 50 657 2953", "+971 55 123 4567", "+971 52 987 6543",
      "+971 56 456 7890", "+971 54 321 0987", "+971 58 765 4321"
    ];
    return phones[timeIndex % phones.length];
  };

  const getDurationForTimeSlot = (timeIndex) => {
    const durations = ["30min", "45min", "1h", "1h 15min", "1h 30min", "2h"];
    return durations[timeIndex % durations.length];
  };

  const getPriceForTimeSlot = (timeIndex) => {
    const prices = ["AED 150", "AED 200", "AED 250", "AED 300", "AED 180", "AED 220"];
    return prices[timeIndex % prices.length];
  };

  const getOriginalPriceForTimeSlot = (timeIndex) => {
    const originalPrices = ["AED 200", "AED 280", "AED 350", "AED 410", "AED 240", "AED 300"];
    return originalPrices[timeIndex % originalPrices.length];
  };

  const getStatusForTimeSlot = (timeIndex) => {
    const statuses = ["Booked", "Confirmed", "Pending", "Completed"];
    return statuses[timeIndex % statuses.length];
  };

  const getServiceCountForTimeSlot = (timeIndex) => {
    return Math.floor(timeIndex % 5) + 1;
  };

  const handleCellLeave = () => {
    setHoverTooltip({ visible: false, x: 0, y: 0, content: null });
  };

  const handleSave = () => {
    const { key, clientName, service, paymentMethod } = popupData;
    if (clientName && service && paymentMethod) {
      setAppointments((prev) => ({
        ...prev,
        [key]: {
          clientName,
          service,
          paymentMethod,
        },
      }));
      setPopupVisible(false);
    }
  };

  const handleRefresh = () => {
    console.log("Refreshed");
    setCurrentTime(new Date());
  };

  const handleViewSelect = (mode) => {
    setViewMode(mode);
    setShowViewDropdown(false);
  };

  // Filter staff list based on selection
  const visibleStaff = staffList.filter((_, index) =>
    selectedStaff.includes(index)
  );

  return (
    <div>
      <div className="tb-container">
        <div className="tb-left">
          <button className="tb-btn" onClick={handleTodayClick}>
            Today
          </button>
          <div className="tb-date-box">
            <button className="tb-icon-btn" onClick={() => navigateDate(-1)}>
              <ChevronLeft size={18} />
            </button>
            <span
              className="tb-date-text"
              onClick={toggleCalendar}
              style={{ cursor: "pointer" }}
            >
              {formatSelectedDate(selectedDate)}
            </span>
            <button className="tb-icon-btn" onClick={() => navigateDate(1)}>
              <ChevronRight size={18} />
            </button>
          </div>
          <button className="tb-icon-circle" onClick={toggleTeamSelection}>
            <Users size={18} />
          </button>
        </div>

        <div className="tb-right">
          <button
            className="tb-icon-circle"
            onClick={() => setWaitlistVisible(!waitlistVisible)}
          >
            <CalendarDays size={18} />
          </button>

          <div className="tb-dropdown">
            <div className="tb-btn-group">
              <button className="tb-icon-part" onClick={handleRefresh}>
                <RotateCcw size={16} />
              </button>
              <div className="tb-divider" />
              <button
                className="tb-text-part"
                onClick={() => setShowViewDropdown(!showViewDropdown)}
              >
                {viewMode}
                <span className="tb-caret-down">▾</span>
              </button>
            </div>
            {showViewDropdown && (
              <div className="tb-dropdown-menu">
                <div
                  className="tb-dropdown-item"
                  onClick={() => handleViewSelect("Day")}
                >
                  Day
                </div>
                <div
                  className="tb-dropdown-item"
                  onClick={() => handleViewSelect("Week")}
                >
                  Week
                </div>
                <div
                  className="tb-dropdown-item"
                  onClick={() => handleViewSelect("Month")}
                >
                  Month
                </div>
              </div>
            )}
          </div>

          <div className="tb-dropdown ds-add-dropdown-container">
            <button
              className="tb-btn tb-add-btn"
              onClick={() => setAddDropdownOpen(!addDropdownOpen)}
            >
              Add <span className="tb-caret-down">▾</span>
            </button>
            {addDropdownOpen && (
              <div className="ds-add-dropdown">
                <div className="ds-dropdown-item">
                  <Calendar size={16} />
                  <span>Appointment</span>
                </div>
                <div className="ds-dropdown-item">
                  <Users size={16} />
                  <span>Group appointment</span>
                </div>
                <div className="ds-dropdown-item">
                  <XSquare size={16} />
                  <span>Blocked time</span>
                </div>
                <div className="ds-dropdown-item">
                  <Tag size={16} />
                  <span>Sale</span>
                </div>
                <div className="ds-dropdown-item">
                  <DollarSign size={16} />
                  <span>Quick payment</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="scheduler-container">
        <div className="scheduler-header-wrapper">
          <div className="time-column-placeholder"></div>
          <div className="scheduler-header">
            {visibleStaff.map((staff, index) => {
              const originalIndex = staffList.findIndex(
                (s) => s.name === staff.name
              );
              return (
                <div className="scheduler-header-col" key={originalIndex}>
                  <div className="scheduler-avatar">
                    {staff.profileImage ? (
                      <img
                        src={staff.profileImage}
                        alt={staff.name}
                        className="avatar-image"
                      />
                    ) : (
                      <div
                        className="avatar-placeholder"
                        style={{
                          backgroundColor: staff.color,
                          borderColor: staff.color,
                        }}
                      >
                        <span className="avatar-text">{staff.avatar}</span>
                      </div>
                    )}
                  </div>
                  <div className="scheduler-name">{staff.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="scheduler-grid">
          <div className="time-column">
            {timeSlots.map((slot, i) => (
              <div 
                key={i} 
                className={`time-slot ${slot.isHourStart ? 'hour-start' : 'quarter-hour'}`}
              >
                {slot.isHourStart ? slot.time : ''}
              </div>
            ))}
          </div>

          <div className="grid-columns">
            {visibleStaff.map((staff, colIdx) => {
              const originalIndex = staffList.findIndex(
                (s) => s.name === staff.name
              );
              return (
                <div key={originalIndex} className="grid-col">
                  {timeSlots.map((slot, rowIdx) => {
                    const key = `${originalIndex}-${rowIdx}`;
                    const hasAppointment = appointments[key];
                    return (
                      <div
                        key={rowIdx}
                        className={`grid-cell ${slot.isHourStart ? 'hour-start-cell' : 'quarter-hour-cell'}`}
                        style={{
                          backgroundColor: hasAppointment
                            ? staff.color
                            : "#fff",
                          border: hasAppointment
                            ? `2px solid ${staff.color}`
                            : slot.isHourStart 
                              ? "1px solid #f1f1f1" 
                              : "1px solid #f1f1f1",
                        }}
                        onClick={(e) =>
                          handleCellClick(originalIndex, rowIdx, e)
                        }
                        onMouseEnter={(e) =>
                          handleCellHover(
                            originalIndex,
                            rowIdx,
                            e,
                            hasAppointment
                          )
                        }
                        onMouseLeave={handleCellLeave}
                      >
                        {hasAppointment && (
                          <div className="appointment-text">
                            {hasAppointment.clientName} -{" "}
                            {hasAppointment.service}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

          {currentHour >= 11 && currentHour < 21 && (
            <div
              className="current-time-line"
              style={{ top: `${currentTimePosition}px` }}
            >
              <div className="time-badge">{currentTimeStr}</div>
            </div>
          )}
        </div>

        {/* Custom Calendar Component */}
        <CustomCalendar
          isVisible={calendarVisible}
          onClose={() => setCalendarVisible(false)}
          onDateSelect={handleDateSelect}
          selectedDate={selectedDate}
        />

        {/* Team Selection Component */}
        <TeamSelection
          isVisible={teamSelectionVisible}
          onClose={() => setTeamSelectionVisible(false)}
          staffList={staffList}
          selectedStaff={selectedStaff}
          onStaffToggle={handleStaffToggle}
        />

        {/* Hover Tooltip */}
        {hoverTooltip.visible && hoverTooltip.content && (
          <div
            className="hover-tooltip-card"
            ref={tooltipRef}
            style={{
              top: hoverTooltip.y,
              left: hoverTooltip.x,
              cursor: "pointer",
            }}
            onClick={() => {
              if (hoverTooltip.content) {
                const { staffIndex, timeIndex, key } = hoverTooltip.content;

                const rect = tooltipRef.current.getBoundingClientRect();

                setPopupData({
                  key,
                  x: rect.left + window.scrollX,
                  y: rect.top + window.scrollY,
                  clientName: appointments[key]?.clientName || "",
                  service: appointments[key]?.service || "",
                  paymentMethod: appointments[key]?.paymentMethod || "",
                  staffIndex,
                });

                setPopupVisible(true);
                setHoverTooltip({ visible: false, x: 0, y: 0, content: null });
              }
            }}
          >
            <div className="tooltip-header">
              <span className="tooltip-time">{hoverTooltip.content.time} – {hoverTooltip.content.time}</span>
              <span className="tooltip-status">{hoverTooltip.content.status}</span>
            </div>

            <div className="tooltip-user-info">
              <div className="tooltip-avatar">{staffList[hoverTooltip.content.staffIndex]?.avatar}</div>
              <div className="tooltip-user-details">
                <div className="tooltip-client-name">{hoverTooltip.content.clientName}</div>
                <div className="tooltip-phone">{hoverTooltip.content.phone}</div>
              </div>
            </div>

            <div className="tooltip-service">
              <div className="tooltip-service-name">{hoverTooltip.content.service}</div>
              <div className="tooltip-staff-duration">{hoverTooltip.content.staff} – {hoverTooltip.content.duration}</div>
            </div>

            <div className="tooltip-price">
              <div className="tooltip-discounted">{hoverTooltip.content.price}</div>
              <div className="tooltip-original">{hoverTooltip.content.originalPrice}</div>
            </div>

            <div className="tooltip-footer">
              <div className="tooltip-service-count">{hoverTooltip.content.serviceCount} services</div>
              <div className="tooltip-calendar-icon">📅</div>
            </div>
          </div>
        )}

        {waitlistVisible && (
          <div className="waitlist-popup">
            <div className="waitlist-header">
              <h2>Waitlist</h2>
            </div>

            <div className="waitlist-tabs">
              {["Waiting", "Expired", "Booked"].map((tab) => (
                <div
                  key={tab}
                  className={`waitlist-tab ${
                    activeWaitlistTab === tab ? "active" : ""
                  }`}
                  onClick={() => setActiveWaitlistTab(tab)}
                >
                  {tab} <span className="count">0</span>
                </div>
              ))}
            </div>

            <div className="waitlist-empty">
              <div className="waitlist-icon" />
              <p className="waitlist-title">
                No {activeWaitlistTab.toLowerCase()} entries
              </p>
              <p className="waitlist-subtext">
                You don't have any clients in the{" "}
                {activeWaitlistTab.toLowerCase()} list
              </p>
            </div>
          </div>
        )}

        {/* Edit Popup */}
        {popupVisible && (
          <div
            className="popup-reminder"
            ref={popupRef}
            style={{ top: popupData.y + 10, left: popupData.x + 10 }}
          >
            <h4>Appointment</h4>
            <label>
              Client Name:
              <input
                type="text"
                value={popupData.clientName}
                onChange={(e) =>
                  setPopupData({ ...popupData, clientName: e.target.value })
                }
              />
            </label>
            <label>
              Professional:
              <input
                type="text"
                value={staffList[popupData.staffIndex]?.name || ""}
                disabled
              />
            </label>
            <label>
              Service:
              <input
                type="text"
                value={popupData.service}
                onChange={(e) =>
                  setPopupData({ ...popupData, service: e.target.value })
                }
              />
            </label>
            <label>
              Payment Method:
              <select
                value={popupData.paymentMethod}
                onChange={(e) =>
                  setPopupData({ ...popupData, paymentMethod: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="Cash">Cash</option>
                <option value="Card">Card</option>
                <option value="UPI">UPI</option>
                <option value="Online">Online</option>
              </select>
            </label>
            <div className="popup-buttons">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setPopupVisible(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scheduler;

