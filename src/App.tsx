import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import Home from "./containers/Home";

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">Home</Menu.Item>
            <Menu.Item key="2">About</Menu.Item>
            <Menu.Item key="3">Github</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Home />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          BlunderTrainer by Miles Olson
        </Footer>
      </Layout>
    </div>
  );
};

export default App;
