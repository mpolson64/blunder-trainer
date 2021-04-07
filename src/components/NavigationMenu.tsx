import { Menu } from "antd";
import { Link } from "react-router-dom";
import React from "react";

const NavigationMenu = () => {
  return (
    <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/about">About</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <a
          href="https://github.com/mpolson64/blunder-trainer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </Menu.Item>
    </Menu>
  );
};

export default NavigationMenu;
