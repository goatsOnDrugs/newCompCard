import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import './Route.css';

const ROUTE_QUERY = gql`
  query RouteQuery($id: ID!) {
    route(id: $id) {
      title
      attempts
      points
      id
    }
  }
`;

const Route = props => {
  return (
    <div className='route-container'>
      {console.log(props.location.state.id)}
      <Query query={ROUTE_QUERY} variables={{ id: props.location.state.id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              {console.log(data)}
              <h2>{data.route.title}</h2>
              <h3>Points: {data.route.points}</h3>
              <div className='qr-code' />
              <div className='attempts-container'>
                <h3>Attempts</h3>
                <div>-</div>
                <div>{data.route.attempts}</div>
                <div>+</div>
              </div>
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default Route;
