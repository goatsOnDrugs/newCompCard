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
  padding: 0;
  margin: 0;
  border: 1px dotted red;
  background-color: #3f444d;
`;
const Main = styled.main`
  width: 100%;
  height: 100%;
`;
