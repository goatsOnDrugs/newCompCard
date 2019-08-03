import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import Cleave from "cleave.js/react";

import Button from "../components/common/Button";

const Home = () => {
  return (
    <Container>
      <H2>ENTER YOUR COMPETITION ID</H2>
      <Input
        placeholder="###-###"
        options={{ blocks: [3, 3], delimiter: "-" }}
      />
      <Link to="routes" style={{ textDecoration: "none", marginTop: 20 }}>
        <Button>Start Climbing</Button>
      </Link>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Input = styled(Cleave)`
  width: 75%;
  height: 30px;
  border: 1px solid #999;
  border-radius: 5px;
  padding-left: 5px;
  background-color: #dfe2e8;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
`;

const H2 = styled.h2``;
