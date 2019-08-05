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
    }
  }
`;

const email = localStorage.getItem("email");

const Profile = () => {
  return (
    <div>
      <Query query={USER_QUERY} variables={{ email: email }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              {console.log(data)}
              {data.user.firstName}
            </div>
          );
        }}
      </Query>
    </div>
  );
};
export default Profile;
