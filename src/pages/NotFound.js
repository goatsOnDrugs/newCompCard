import React from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";

const NotFound = () => {
  return (
    <Layout>
      <Message>Page Not Found</Message>
    </Layout>
  );
};

export default NotFound;

const Message = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
