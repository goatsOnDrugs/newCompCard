import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { navigate } from "@reach/router";
import styled from "styled-components";

import { AUTH_TOKEN } from "../constants";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default class Login extends Component {
  state = {
    login: true, // switches between login and signup
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  };
  render() {
    const { login, email, password, firstName, lastName } = this.state;
    return (
      <Container>
        <Title>{login ? "Login" : "Sign Up"}</Title>
        <InputWrapper>
          {!login && (
            <Input
              value={firstName}
              onChange={e => this.setState({ firstName: e.target.value })}
              type='text'
              placeholder='First Name'
            />
          )}
          {!login && (
            <Input
              value={lastName}
              onChange={e => this.setState({ lastName: e.target.value })}
              type='text'
              placeholder='Last Name'
            />
          )}
          <Input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type='text'
            placeholder='example@email.com'
          />
          <Input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type='text'
            placeholder='Password'
          />
        </InputWrapper>
        <div>
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, firstName, lastName }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <SubmitBtn onClick={mutation}>
                {login ? "login" : "create account"}
              </SubmitBtn>
            )}
          </Mutation>
          <ToggleButton onClick={() => this.setState({ login: !login })}>
            {login ? "Need to create an account?" : "already have an account?"}
          </ToggleButton>
        </div>
      </Container>
    );
  }

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup;
    this._saveUserData(token);
    localStorage.setItem("email", this.state.email);
    navigate("/routes");
  };

  // local storage is not ideal. change to another method.
  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding-top: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
`;
const Title = styled.h2``;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 150px;
  width: 100%;
  border: 1px dotted #000;
  padding: 20px;
`;
const Input = styled.input`
  width: 75%;
  height: 30px;
  border: 1px solid #000;
  border-radius: 5px;
  padding-left: 5px;
`;
const ToggleButton = styled.div`
  border: 1px solid #000;
  margin-top: 10px;
`;
const SubmitBtn = styled.div`
  height: 30px;
  width: 100%;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
