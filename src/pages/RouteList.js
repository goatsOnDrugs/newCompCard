import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ROUTES_QUERY = gql`
  query RouteListQuery {
    routeList {
      title
      climbedBy {
        email
      }
    }
  }
`;

const RouteList = () => {
  return (
    <div>
      <Query query={ROUTES_QUERY}>
        {data => {
          return <div>{console.log(data)};</div>;
        }}
      </Query>
    </div>
  );
};

export default RouteList;
