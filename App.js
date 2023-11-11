import logo from "./logo.svg";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Login from "./Screens/Login";
import CreateItem from "./Screens/CreateItem";
import Header from "./Components/Header";
// import { ThemeProvider } from 'styled-components';
// import { GlobalStyles } from './Components/global';
// import { theme } from './theme';
import Sidebar from "./Components/Sidebar";
import ViewItem from "./Screens/ViewItem";
import Dashboard from "./Screens/itemdashboard";
import Bpdashboard from "./Screens/bpdashboard";
import Home from "./Screens/Home";
import CreateBPCatalog from "./BPCatalog/CreateCatalog"
import EditBPCatalog from "./BPCatalog/EditCatalog"
import ViewBPCatalog from "./BPCatalog/ViewCatalog"


function App() {

  const inputFlag=0;

  return (
    <Router>
      <div id="page-wrap" className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/login" component={Login} />
          <Route exact path="/dashboard">
            <Sidebar
              pageWrapId={"page-wrap"}
              outerContainerId={"outer-container"}
            />
            <Header />
            <Home />
          </Route>
          {/* BP catalog routes start */}
          <Route exact path="/create-BPcatalog">
            <Sidebar
              pageWrapId={"page-wrap"}
              outerContainerId={"outer-container"}
            />
            <Header />
            <CreateBPCatalog />
          </Route>
          <Route exact path="/view-BPcatalog">
            <Sidebar
              pageWrapId={"page-wrap"}
              outerContainerId={"outer-container"}
            />
            <Header />
            <ViewBPCatalog />
          </Route>
          <Route exact path="/edit-BPcatalog">
            <Sidebar
              pageWrapId={"page-wrap"}
              outerContainerId={"outer-container"}
            />
            <Header />
            <EditBPCatalog />
          </Route>

          {/* BP catalog routes end */}
          
          <Route exact path="/dashboard/item">
            <Sidebar
              pageWrapId={"page-wrap"}
              outerContainerId={"outer-container"}
            />
            <Header />
            <Dashboard />
          </Route>
          <Route exact path="/dashboard/bpcatalog">
            <Sidebar
              pageWrapId={"page-wrap"}
              outerContainerId={"outer-container"}
            />
            <Header />
            <Bpdashboard />
          </Route>
          <Route path="/createItem">
            <Sidebar
              pageWrapId={"page-wrap"}
              outerContainerId={"outer-container"}
            />
            <Header />
            <CreateItem />
          </Route>
          <Route path="/viewItem">
            <Sidebar
              pageWrapId={"page-wrap"}
              outerContainerId={"outer-container"}
            />
            <Header />
            <ViewItem />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
