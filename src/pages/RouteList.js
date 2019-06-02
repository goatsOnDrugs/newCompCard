import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ROUTES_QUERY = gql`
  query UserRoutesQuery($email: String!) {
    user(email: $email) {
      email
      routes {
        id
        title
        attempts
        points
      }
    }
  }
`;

const RouteList = props => {
  return (
    <div>
      <Query
        query={ROUTES_QUERY}
        variables={{ email: props.location.state.email }}
      >
        {data => {
          return <div>{console.log(data)};</div>;
        }}
      </Query>
      {console.log(props.location.state.email)}
    </div>
  );
};

export default RouteList;
