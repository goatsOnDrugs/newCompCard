import React, { Component } from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Profile from "../components/Profile/Profile";

export default class ProfilePage extends Component {
  render() {
    return (
      <Container>
        <Card>
          <Profile />
          {/* // make a editing profile componenthere // make 3 buttons to
          conditionaly render that set state in this component to conditionaly
          render above componets: Edit, Save + Cancel */}
        </Card>
      </Container>
    );
  }
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Card = styled.div`
  width: 85%;
  height: 80%;
  background: #dfe2e8;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  justify-content: space-between;
  padding: 10px;
  margin-top: 20px;
`;
