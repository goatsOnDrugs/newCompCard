import React, { Component } from "react";
import QrReader from "react-qr-reader";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import styled from "styled-components";

import Button from "../components/common/Button";

const USER_QUERY = gql`
  query UserQuery($email: String!) {
    user(email: $email) {
      firstName
      lastName
      id
    }
  }
`;

const SIGN_MUTATION = gql`
  mutation SignRoute($routeId: ID!, $author: String!) {
    signRoute(routeId: $routeId, author: $author) {
      routeId
      author
    }
  }
`;

export default class Signature extends Component {
  state = {
    routeId: ""
  };
  handleScan = data => {
    if (data) {
      this.setState({
        routeId: data
      });
    }
  };
  handleError = err => {
    console.error(err);
  };
  render() {
    const email = localStorage.getItem("email");
    return (
      <Container>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
        <p>{this.state.routeId}</p>
        <Query query={USER_QUERY} variables={{ email: email }}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              <Mutation
                mutation={SIGN_MUTATION}
                variables={{
                  routeId: this.state.routeId,
                  author: `${data.user.firstName} ${data.user.lastName}`
                }}
              >
                {mutation => <Button onClick={mutation}>Sign</Button>}
              </Mutation>
            );
          }}
        </Query>
      </Container>
    );
  }
}

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding-top: 20px;
`;
