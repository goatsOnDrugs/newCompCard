import React from "react";
import { Router } from "@reach/router";
import styled from "styled-components";

import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import RouteList from "./pages/RouteList";
import Route from "./pages/Route";
import Home from "./pages/Home";
import Signature from "./pages/Signature";
import Signup from "./pages/Signup";
function App() {
  return (
    <Layout>
      <StyledRouter>
        <Home path="/" />
        <Login path="login" />
        <RouteList path="routes" />
        <Route path="route" />
        <Signature path="signature" />
        <Signup path="signup" />
      </StyledRouter>
    </Layout>
  );
}

export default App;

const StyledRouter = styled(Router)`
  height: 100%;
`;
