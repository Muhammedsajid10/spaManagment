import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaTags,
  FaSmile,
  FaBook,
  FaImage,
  FaBullhorn,
  FaUsers,
  FaChartLine,
  FaThLarge,
} from "react-icons/fa";
import "./Firstdashboard.css";

const Sidenavbar = () => {
  const [active, setActive] = useState(2);

  const menuItems = [
    { icon: <FaHome />, label: "Home", to: "/" },
    { icon: <FaCalendarAlt />, label: "Calendar", to: "/calendar" },
    { icon: <FaTags />, label: "Tags", to: "/tags" },
    { icon: <FaSmile />, label: "Smile", to: "/smile" },
    { icon: <FaBook />, label: "Book", to: "/book" },
    { icon: <FaImage />, label: "Images", to: "/images" },
    { icon: <FaBullhorn />, label: "Announcements", to: "/announcements" },
    { icon: <FaUsers />, label: "Users", to: "/users" },
    { icon: <FaChartLine />, label: "Analytics", to: "/analytics" },
    { icon: <FaThLarge />, label: "Apps", to: "/apps" },
  ];

  return (
    <div className="sb-sidebar">
      {menuItems.map((item, index) => (
        <NavLink
          to={item.to}
          key={index}
          className={({ isActive }) =>
            `sb-icon-wrapper ${isActive || active === index ? "sb-active" : ""}`
          }
          onClick={() => setActive(index)}
          title={item.label}
        >
          <span className="sb-icon">{item.icon}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidenavbar;