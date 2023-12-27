import React, { useState } from "react";
import "./styles/layout.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const userMenu = [
    {
      name: "Home",
      icon: "ri-home-2-fill",
      path: "/userHome",
    },
    {
      name: "Appointments",
      icon: "ri-file-list-fill",
      path: "/appointments",
    },
    {
      name: "Apply Counsellor",
      icon: "ri-hospital-fill",
      path: "/applyingCounsellor",
    },
    {
      name: "Profile",
      icon: "ri-file-user-fill ",
      path: "/profile",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      icon: "ri-home-2-fill",
      path: "/userHome",
    },
    {
      name: "Users",
      icon: "ri-user-line",
      path: "/users",
    },
    {
      name: "Counsellors",
      icon: "ri-user-add-line",
      path: "/counsellors",
    },

    {
      name: "Admins",
      icon: "ri-user-settings-line",
      path: "/admin",
    },
    {
      name: "Profile",
      icon: "ri-file-user-fill ",
      path: "/profile",
    },
  ];

  const menuToBeRendered = user?.isAdministrator ? adminMenu : userMenu;

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className={`${collapsed ? "collapsed-sidebar" : "sidebar"}`}>
          <div
            className={`${
              collapsed
                ? "collapsed-sidebar-header-image"
                : "sidebar-header-image"
            }`}
          >
            <img src="./assets/images/logo.png" alt="Logo" />
          </div>

          <div
            className={`${
              collapsed ? "collapsed-sidebar-header" : "sidebar-header"
            }`}
          >
            <img src="./assets/images/logo.png" alt="Logo" />
          </div>

          <div className="menu">
            {menuToBeRendered.map((menu, index) => {
              return (
                <div
                  key={index}
                  className={`d-flex menu-item ${
                    selectedMenu === index ? "active" : ""
                  }`}
                  onClick={() => handleMenuClick(index)}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}

            <div
              className={`d-flex menu-item`}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className="ri-logout-box-r-fill"></i>
              {!collapsed && <Link>Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {!collapsed ? (
              <i
                className="ri-close-line remix-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            ) : (
              <i
                className="ri-menu-line remix-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            )}

            <div className="info-use">
              <i className="ri-notification-3-fill remix-icon"></i>
              <Link className="anchor" to="/userHome">
                {user?.fullName}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
