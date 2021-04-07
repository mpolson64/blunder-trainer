import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Layout } from "antd";
import Home from "./containers/Home";
import NavigationMenu from "./components/NavigationMenu";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from "./components/About";

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Layout className="layout">
          <Header>
            <NavigationMenu />
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            BlunderTrainer by Miles Olson
          </Footer>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
