import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

import Button from "../common/Button";
import useProfileForm from "../../customHooks";

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

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
  ) {
    updateUser(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

const email = localStorage.getItem("email");

const EditProfile = () => {
  const { inputs, handleInputChange, handleSubmit } = useProfileForm();
  return (
    <div>
      <Query query={USER_QUERY} variables={{ email: email }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <Container onSubmit={handleSubmit}>
              <InputWrapper>
                <Label htmlFor="firstName">FIRST NAME</Label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder={`${data.user.firstName}`}
                  onChange={handleInputChange}
                  value={inputs.firstName}
                />
              </InputWrapper>
              <InputWrapper>
                <Label htmlFor="lastName">LAST NAME</Label>
                <Input
                  type="text"
                  name="lastName"
                  placeholder={`${data.user.lastName}`}
                  onChange={handleInputChange}
                  value={inputs.lastName}
                />
              </InputWrapper>
              <InputWrapper>
                <Label htmlFor="email">EMAIL</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder={`${data.user.email}`}
                  onChange={handleInputChange}
                  value={inputs.email}
                />
              </InputWrapper>
              <Mutation
                mutation={UPDATE_USER_MUTATION}
                variables={{
                  id: data.user.id,
                  firstName: inputs.firstName,
                  lastName: inputs.lastName,
                  email: inputs.email
                }}
              >
                {mutation => (
                  <div onClick={mutation}>
                    <Button title="SAVE" type="submit" />
                  </div>
                )}
              </Mutation>
            </Container>
          );
        }}
      </Query>
    </div>
  );
};

export default EditProfile;

const Container = styled.form``;

const Input = styled.input`
  width: 75%;
  height: 30px;
  border: 1px solid #999;
  border-radius: 5px;
  padding-left: 5px;
  background-color: #dfe2e8;
`;

const InputWrapper = styled.div`
  display: flex;
`;

const Label = styled.label``;
