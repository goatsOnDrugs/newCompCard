import React from "react";
import styled from "styled-components";

import { Query } from "react-apollo";
import gql from "graphql-tag";

const USER_QUERY = gql`
  query UserQuery($email: String!) {
    user(email: $email) {
      firstName
      lastName
      id
      email
    }
  }
`;

const email = localStorage.getItem("email");

const EditProfile = () => {
  return (
    <div>
      <Query query={USER_QUERY} variables={{ email: email }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <Container>
              {console.log(data)}
              <Name>{`${data.user.firstName} ${data.user.lastName}`}</Name>
              <Email>{data.user.email}</Email>
            </Container>
          );
        }}
      </Query>
    </div>
  );
};

export default EditProfile;

const Container = styled.div``;

const Name = styled.h1``;

const Email = styled.h2``;
