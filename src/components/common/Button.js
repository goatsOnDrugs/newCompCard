import React from "react";
import styled from "styled-components";

const Button = ({ children }, props) => {
  return (
    <Container type={props.type} disabled={props.disabled}>
      {children}
    </Container>
  );
};

export default Button;

const Container = styled.button`
  height: 35px;
  width: 100%;
  border: 1px solid #999;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #2ac924;
  /* background: ${props => (props.primary ? "#2ac924" : "#000")}; */
  color: #fff;
  font-size: 18px;
`;
