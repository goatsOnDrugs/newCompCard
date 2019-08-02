import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import QRCode from "qrcode.react";
import styled from "styled-components";

import Button from "../components/common/Button";
import "./Route.css";

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
    <Container>
      <Card>
        <Query query={ROUTE_QUERY} variables={{ id: props.location.state.id }}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              <div>
                <h2>{data.route.title}</h2>
                <h3>POINTS: {data.route.points}</h3>
                <QRCode value={data.route.id} />
                <div className='attempts-container'>
                  <h3>ATTEMPTS:</h3>
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
                  <h3>
                    SIGNATURES:{" "}
                    {data.route.signatures ? data.route.signatures.length : 0}
                  </h3>
                  <div />
                  <div />
                </div>
                <Button className='submit-button'>SUBMIT</Button>
              </div>
            );
          }}
        </Query>
      </Card>
    </Container>
  );
};

export default Route;

const Container = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Card = styled.div`
  width: 90%;
  height: 80%;
  background: #dfe2e8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
