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
  width: 100%;
  border: 1px dotted red;
`;
const Main = styled.main`
  width: 100%;
`;
