import React from "react";
import "./App.scss";
import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import Routes from "./containers/Routes";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.baseURL = `http://${window.location.hostname}:4000`;

const menuItems = [
  {
    title: "Tasks",
    submenu: [
      {
        title: "DZ-1",
        submenu: [
          { title: "validationForm", link: "/form" },
          { title: "vote", link: "/vote" }
        ]
      }
    ]
  }
];

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation menuItems={menuItems} />
        <div className="App_Routes">
          <Routes />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
