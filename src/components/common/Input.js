import React from "react";
import styled from "styled-components";

const Input = props => {
  return <Container placeholder={props.placeholder} />;
};

export default Input;

const Container = styled.input`
  width: 75%;
  height: 30px;
  border: 1px solid #999;
  border-radius: 5px;
  padding-left: 5px;
  background-color: #dfe2e8;
`;
