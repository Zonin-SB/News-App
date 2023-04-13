import React from "react";
import { Menu } from "antd";
import "./Navbar.css";
function Navbar() {
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item
          className="logo"
          key="heading"
          style={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <h1>NEWS APP</h1>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Navbar;
