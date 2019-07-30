import React from "react";
import styled from "styled-components";

const Button = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Button;

const Container = styled.div`
  height: 35px;
  width: 100%;
  border: 1px solid #999;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #2ac924;
  color: #fff;
`;
