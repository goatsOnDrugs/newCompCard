import React from "react";
import "./App.css";
import { Router } from "@reach/router";

import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import RouteList from "./pages/RouteList";
import Route from "./pages/Route";
import Home from "./pages/Home";
import Signature from "./pages/Signature";

function App() {
  return (
    <Layout>
      <Router>
        <Home path='/' />
        <Login path='login' />
        <RouteList path='routes' />
        <Route path='route' />
        <Signature path='signature' />
      </Router>
    </Layout>
  );
}

export default App;
