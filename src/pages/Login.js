import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { navigate } from "@reach/router";
import styled from "styled-components";

import Button from "../components/common/Button";
import Input from "../components/common/Input";
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
        <Title>{login ? "Welcome!" : "Sign Up"}</Title>
        {login ? (
          <InputWrapper login>
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
              placeholder={"Password"}
            />
          </InputWrapper>
        ) : (
          <InputWrapper signup>
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
              placeholder={"Password"}
            />
          </InputWrapper>
        )}
        <ButtonWrapper>
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, firstName, lastName }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <Button onClick={mutation}>
                {login ? "login" : "create account"}
              </Button>
            )}
          </Mutation>
          <ToggleButton onClick={() => this.setState({ login: !login })}>
            {login ? "Need to create an account?" : "already have an account?"}
          </ToggleButton>
        </ButtonWrapper>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid green;
`;
const Title = styled.h2`
  color: #fff;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.login ? "space-evenly" : "space-around")};
  align-items: center;
  height: 40%;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  height: 20%;
  justify-content: space-around;
`;

const ToggleButton = styled.div`
  height: 30px;
  width: 100%;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #000;
  color: #fff;
`;
