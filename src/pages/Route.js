import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import QRCode from 'qrcode.react';
import './Route.css';

const ROUTE_QUERY = gql`
  query RouteQuery($id: ID!) {
    route(id: $id) {
      title
      attempts
      points
      id
      climbedBy {
        firstName
        lastName
      }
    }
  }
`;

const UPDATE_ATTEMPT_MUTATION = gql`
  mutation UpdateAttempt($id: ID!, $attempts: Int!) {
    updateRouteAttempts(id: $id, attempts: $attempts) {
      id
      title
      attempts
      points
    }
  }
`;

const Route = props => {
  return (
    <div className='route-container'>
      <Query query={ROUTE_QUERY} variables={{ id: props.location.state.id }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;
          return (
            <div>
              <h2>{data.route.title}</h2>
              <h3>Points: {data.route.points}</h3>
              <QRCode
                value={
                  // id: data.route.id,
                  // attempts: data.route.attempts.toString(),
                  data.route.climbedBy.firstName
                }
              />
              <div className='attempts-container'>
                <h3>Attempts:</h3>
                {data.route.attempts > 0 ? (
                  <Mutation
                    mutation={UPDATE_ATTEMPT_MUTATION}
                    variables={{
                      id: data.route.id,
                      attempts: data.route.attempts - 1
                    }}
                  >
                    {mutation => <div onClick={mutation}>-</div>}
                  </Mutation>
                ) : (
                  <div>-</div>
                )}
                <div>{data.route.attempts}</div>
                <Mutation
                  mutation={UPDATE_ATTEMPT_MUTATION}
                  variables={{
                    id: data.route.id,
                    attempts: data.route.attempts + 1
                  }}
                >
                  {mutation => <div onClick={mutation}>+</div>}
                </Mutation>
              </div>
              <div>
                <h3>Signatures:</h3>
                <div />
                <div />
              </div>
              <div className='submit-button'>Submit</div>
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default Route;
