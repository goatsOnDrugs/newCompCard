import React from "react";
import Header from "./Header";

import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Main = styled.main`
  height: 100%;
`;
