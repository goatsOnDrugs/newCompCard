import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import RouteListItem from "../components/Routes/RouteListItem";
import "./RouteList.css";

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
  return (
    <div>
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
    </div>
  );
};

export default RouteList;
