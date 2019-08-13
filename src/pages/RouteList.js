import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import RouteListItem from "../components/Routes/RouteListItem";
import "./RouteList.css";
import Button from "../components/common/Button";
import { AUTH_TOKEN } from "../constants";
import { navigate } from "@reach/router";
import styled from "styled-components";

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
  const email = localStorage.getItem("email");
  const auth = localStorage.getItem(AUTH_TOKEN);
  return (
    <Container>
      {auth ? (
        <Query query={ROUTES_QUERY} variables={{ email: email }}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;
            return (
              <div className="list-container">
                {data.user.routes.map(route => (
                  <RouteListItem
                    key={route.id}
                    id={route.id}
                    title={route.title}
                    attempts={route.attempts}
                    points={route.points}
                  />
                ))}
              </div>
            );
          }}
        </Query>
      ) : (
        <ButtonContainer>
          <Button click={() => navigate("/login")} title="LOGIN" />
        </ButtonContainer>
      )}
    </Container>
  );
};

export default RouteList;

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 80%;
`;
