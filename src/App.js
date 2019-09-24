import React from "react";
import { Router } from "@reach/router";
import styled from "styled-components";

import { AUTH_TOKEN } from "./constants";
// pages
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import RouteList from "./pages/RouteList";
import Route from "./pages/Route";
import Home from "./pages/Home";
import Signature from "./pages/Signature";
import Signup from "./pages/Signup";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

function App() {
  const auth = localStorage.getItem(AUTH_TOKEN);

  return (
    <Layout>
      <StyledRouter>
        <NotFound default />
        <Login path="/" />
        <Signup path="signup" />
        <Home path="/" />
        <RouteList path="routes" />
        <Route path="route" />
        <Signature path="signature" />
        <ProfilePage path="profile" />
        <AdminDashboard path="dashboard" />
      </StyledRouter>
    </Layout>
  );
}

export default App;

const StyledRouter = styled(Router)`
  height: 100%;
`;
